import { Router } from 'react-router-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import {
  AccessDeniedError,
  LoadFormList,
  UnexpectedError,
  AccountModel
} from '@/domain'
import { mockAccountModel, mockFormListModel } from '@/domain/test'
import { ApiContext } from '@/presentation/contexts'
import { FormList } from '@/presentation/pages'

class LoadFormListSpy implements LoadFormList {
  callsCount = 0
  forms = mockFormListModel(3)
  async loadAll(): Promise<LoadFormList.Model[]> {
    this.callsCount++
    return this.forms
  }
}

type SutTypes = {
  loadFormListSpy: LoadFormListSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadFormListSpy = new LoadFormListSpy()): SutTypes => {
  const history = createMemoryHistory({
    initialEntries: ['/']
  })
  const setCurrentAccountMock = jest.fn()
  render(
    <Router navigator={history} location={history.location}>
      <ApiContext.Provider
        value={{
          setCurrentAccount: setCurrentAccountMock,
          getCurrentAccount: () => mockAccountModel()
        }}
      >
        <FormList loadFormList={loadFormListSpy} />
      </ApiContext.Provider>
    </Router>
  )
  return {
    loadFormListSpy,
    history,
    setCurrentAccountMock
  }
}

describe('FormList Component', () => {
  test('should present skeleton on start', async () => {
    makeSut()
    const tbody = screen.getByTestId('tbody')
    expect(tbody.children).toHaveLength(1)
    expect(tbody.querySelector('svg').getAttribute('role')).toBe('img')
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => tbody)
  })

  test('should call LoadFormList', async () => {
    const { loadFormListSpy } = makeSut()
    expect(loadFormListSpy.callsCount).toBe(1)
    const tbody = screen.getByTestId('tbody')
    await waitFor(() => tbody)
  })

  test('should render FormItems on success', async () => {
    makeSut()
    const tbody = screen.getByTestId('tbody')
    await waitFor(() => tbody)
    expect(tbody.children).toHaveLength(3)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  test('should render error on UnexpectedError', async () => {
    const loadFormListSpy = new LoadFormListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadFormListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadFormListSpy)
    const tableResponsive = screen.getByTestId('table-responsive')
    await waitFor(() => tableResponsive)
    expect(screen.queryByTestId('table')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  })

  test('should logout on AccessDeniedError', async () => {
    const loadFormListSpy = new LoadFormListSpy()
    jest
      .spyOn(loadFormListSpy, 'loadAll')
      .mockRejectedValueOnce(new AccessDeniedError())
    const { setCurrentAccountMock, history } = makeSut(loadFormListSpy)
    const tableResponsive = screen.getByTestId('table-responsive')
    await waitFor(() => tableResponsive)
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('should call LoadFormList on reload', async () => {
    const loadFormListSpy = new LoadFormListSpy()
    jest
      .spyOn(loadFormListSpy, 'loadAll')
      .mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadFormListSpy)
    const tableResponsive = screen.getByTestId('table-responsive')
    await waitFor(() => tableResponsive)
    fireEvent.click(screen.getByTestId('reload'))
    expect(loadFormListSpy.callsCount).toBe(1)
    await waitFor(() => tableResponsive)
  })
})
