import { RenderResult, screen } from '@testing-library/react'

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
