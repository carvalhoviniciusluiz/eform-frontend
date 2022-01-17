import { Router } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Sidebar } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'

describe('Sidebar Component', () => {
  test('should call setCurrentAccount with null', () => {
    const setCurrentAccountMock = jest.fn()
    const history = createMemoryHistory({
      initialEntries: ['/']
    })
    render(
      <Router navigator={history} location={history.location}>
        <ApiContext.Provider
          value={{ setCurrentAccount: setCurrentAccountMock }}
        >
          <Sidebar />
        </ApiContext.Provider>
      </Router>
    )
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
