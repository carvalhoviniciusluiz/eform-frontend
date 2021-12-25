import { fireEvent, render, RenderResult } from '@testing-library/react'
import * as faker from 'faker'
import { TextField } from '@/presentation/components/inputs'

const makeSut = (fieldName: string): RenderResult => {
  return render(<TextField name={fieldName} />)
}

describe('TextField Component', () => {
  test('should begin with readOnly', () => {
    const field = faker.database.column()
    const { getByTestId } = makeSut(field)
    const input = getByTestId(field) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test('should remove readOnly on focus', () => {
    const field = faker.database.column()
    const { getByTestId } = makeSut(field)
    const input = getByTestId(field) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})
