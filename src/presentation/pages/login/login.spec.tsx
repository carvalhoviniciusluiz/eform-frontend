import { render } from '@testing-library/react'
import Login from './login'

describe('Login component', () => {
  test('should render continue label on start', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(1)
  })
})
