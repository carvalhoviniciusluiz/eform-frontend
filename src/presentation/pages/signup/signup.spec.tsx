import { render, RenderResult, screen } from '@testing-library/react'
import { Signup } from '@/presentation/pages'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Signup />)
  return {
    sut
  }
}

const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
) => {
  const el = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(el.childElementCount).toBe(count)
}

const testButtonIsDisable = (
  sut: RenderResult,
  buttonName: string,
  isDisabled: boolean
) => {
  const button = sut.getByTestId(buttonName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

const testElementText = (
  sut: RenderResult,
  fieldName: string,
  text: string
) => {
  const el = sut.getByTestId(fieldName)
  expect(el.textContent).toBe(text)
}

const testElementNotExists = (sut: RenderResult, fieldName: string) => {
  expect(screen.queryByTestId(fieldName)).toBeNull()
}

describe('Signup Component', () => {
  test('should start with initial state', () => {
    const { sut } = makeSut()
    testButtonIsDisable(sut, 'submit', true)
    testElementText(sut, 'label-continue', 'Submit')
    testChildCount(sut, 'submit', 1)
    testElementNotExists(sut, 'firstName-status')
    testElementNotExists(sut, 'lastName-status')
    testElementNotExists(sut, 'documentNumber-status')
    testElementNotExists(sut, 'phone-status')
    testElementNotExists(sut, 'email-status')
    testElementNotExists(sut, 'password-status')
    testElementNotExists(sut, 'passwordConfirmation-status')
  })
})
