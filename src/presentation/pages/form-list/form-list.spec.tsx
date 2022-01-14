import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { LoadFormList, UnexpectedError } from '@/domain'
import { mockFormListModel } from '@/domain/test'
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
}

const makeSut = (loadFormListSpy = new LoadFormListSpy()): SutTypes => {
  render(<FormList loadFormList={loadFormListSpy} />)
  return {
    loadFormListSpy
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

  test('should render error on failure', async () => {
    const loadFormListSpy = new LoadFormListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadFormListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadFormListSpy)
    const tableResponsive = screen.getByTestId('table-responsive')
    await waitFor(() => tableResponsive)
    expect(screen.queryByTestId('table')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
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
