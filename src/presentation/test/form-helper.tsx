import { fireEvent, screen } from '@testing-library/react'
import * as faker from 'faker'

export const testChildCount = (fieldName: string, count: number) => {
  const el = screen.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisable = (
  buttonName: string,
  isDisabled: boolean
) => {
  const button = screen.getByTestId(buttonName)
  expect((button as HTMLButtonElement).disabled).toBe(isDisabled)
}

export const testElementText = (fieldName: string, text: string) => {
  const el = screen.getByTestId(fieldName)
  expect(el.textContent).toBe(text)
}

export const populateField = (
  fieldName: string,
  value = faker.random.word()
): HTMLElement => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, {
    target: { value }
  })
  return input
}

export const testStatusForField = (
  fieldName: string,
  cssElementName: string,
  exists: boolean
) => {
  const el = screen.getByTestId(`${fieldName}-status`)
  expect(el.className.includes(cssElementName)).toBe(exists)
}

export const testMessageTitle = (fieldName: string, message: string) => {
  const el = screen.getByTestId(fieldName)
  expect(el.title).toBe(message)
}

export const testTextContent = (fieldName: string, message: string) => {
  const el = screen.getByTestId(fieldName)
  expect(el.textContent).toBe(message)
}

export const testElementExists = (fieldName: string) => {
  const el = screen.getByTestId(fieldName)
  expect(el).toBeTruthy()
}
