import { fireEvent, RenderResult, screen } from '@testing-library/react'
import * as faker from 'faker'

export const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
) => {
  const el = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisable = (
  sut: RenderResult,
  buttonName: string,
  isDisabled: boolean
) => {
  const button = sut.getByTestId(buttonName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testElementText = (
  sut: RenderResult,
  fieldName: string,
  text: string
) => {
  const el = sut.getByTestId(fieldName)
  expect(el.textContent).toBe(text)
}

export const testElementNotExists = (sut: RenderResult, fieldName: string) => {
  expect(screen.queryByTestId(fieldName)).toBeNull()
}

export const populateField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.random.word()
): HTMLElement => {
  const input = sut.getByTestId(fieldName)
  fireEvent.input(input, {
    target: { value }
  })
  return input
}

export const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
) => {
  const status = sut.getByTestId(`${fieldName}-status`)
  expect(status.textContent).toBe(validationError)
  const input = sut.getByTestId(fieldName)
  expect(input.className.includes('error')).toBeTruthy()
}
