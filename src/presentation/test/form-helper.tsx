import { fireEvent, RenderResult } from '@testing-library/react'
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
  cssElementName: string,
  exists: boolean
) => {
  const el = sut.getByTestId(`${fieldName}-status`)
  expect(el.className.includes(cssElementName)).toBe(exists)
}

export const testMessageTitle = (
  sut: RenderResult,
  fieldName: string,
  message: string
) => {
  const el = sut.getByTestId(fieldName)
  expect(el.title).toBe(message)
}

export const testTextContent = (
  sut: RenderResult,
  fieldName: string,
  message: string
) => {
  const el = sut.getByTestId(fieldName)
  expect(el.textContent).toBe(message)
}

export const testElementExists = (sut: RenderResult, fieldName: string) => {
  const el = sut.getByTestId(fieldName)
  expect(el).toBeTruthy()
}
