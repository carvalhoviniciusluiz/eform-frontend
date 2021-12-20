import { render, RenderResult, screen } from '@testing-library/react'
import Login from './login'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login />)
  return {
    sut
  }
}

describe('Login component', () => {
  test('should not render errors on start', () => {
    makeSut()
    expect(screen.queryByTestId('error-wrap')).toBeNull()
  })

  test('should render continue label on start', () => {
    const { sut } = makeSut()
    const submit = sut.getByTestId('submit')
    expect(submit.childElementCount).toBe(1)
  })

  test('should disabled submit button', () => {
    const { sut } = makeSut()
    const submit = sut.getByTestId('submit') as HTMLButtonElement
    expect(submit.disabled).toBe(true)
  })
})
