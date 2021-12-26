import { render, RenderResult } from '@testing-library/react'
import { Signup } from '@/presentation/pages'
import { Helper } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Signup />)
  return {
    sut
  }
}

describe('Signup Component', () => {
  test('should start with initial state', () => {
    const { sut } = makeSut()
    Helper.testButtonIsDisable(sut, 'submit', true)
    Helper.testChildCount(sut, 'submit', 1)
    Helper.testElementText(sut, 'label-continue', 'Submit')
    Helper.testElementNotExists(sut, 'firstName-status')
    Helper.testElementNotExists(sut, 'lastName-status')
    Helper.testElementNotExists(sut, 'documentNumber-status')
    Helper.testElementNotExists(sut, 'phone-status')
    Helper.testElementNotExists(sut, 'email-status')
    Helper.testElementNotExists(sut, 'password-status')
    Helper.testElementNotExists(sut, 'passwordConfirmation-status')
  })
})
