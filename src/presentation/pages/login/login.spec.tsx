import { render, screen } from '@testing-library/react'
import Login from './login'

describe('Login component', () => {
  test('should not render errors on start', () => {
    render(<Login />)
    expect(screen.queryByTestId('error-wrap')).toBeNull()
  })

  test('should render continue label on start', () => {
    const { getByTestId } = render(<Login />)
    const submit = getByTestId('submit')
    expect(submit.childElementCount).toBe(1)
  })

  test('should disabled submit button', () => {
    const { getByTestId } = render(<Login />)
    const submit = getByTestId('submit') as HTMLButtonElement
    expect(submit.disabled).toBe(true)
  })
})
