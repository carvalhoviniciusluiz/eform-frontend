import { fireEvent, screen } from '@testing-library/react'
import * as faker from 'faker'

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
  validationError: string
): void => {
  expect(screen.getByTestId(fieldName)).toHaveAttribute('class', 'error')
  expect(screen.getByTestId(fieldName)).toHaveAttribute(
    'title',
    validationError
  )
}
