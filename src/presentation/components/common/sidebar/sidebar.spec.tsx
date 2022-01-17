import { Router } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { AccountModel } from '@/domain'
import { Sidebar } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  const history = createMemoryHistory({
    initialEntries: ['/']
  })
  render(
    <Router navigator={history} location={history.location}>
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Sidebar />
      </ApiContext.Provider>
    </Router>
  )
  return {
    history,
    setCurrentAccountMock
  }
}

describe('Sidebar Component', () => {
  test('should call setCurrentAccount with null', () => {
    const { history, setCurrentAccountMock } = makeSut()
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
