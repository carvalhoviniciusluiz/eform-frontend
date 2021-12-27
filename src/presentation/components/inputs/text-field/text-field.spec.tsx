import { fireEvent, render, RenderResult } from '@testing-library/react'
import * as faker from 'faker'
import { TextField } from '@/presentation/components/inputs'

const makeSut = (fieldName: string, label?: string): RenderResult => {
  return render(<TextField name={fieldName} label={label} />)
}

describe('TextField Component', () => {
  test('should start with initial state', () => {
    const field = faker.database.column()
    const { getByTestId } = makeSut(field)
    const el = getByTestId('textField')
    expect(el.childElementCount).toBe(1)
  })

  test('should show label', () => {
    const label = faker.random.word()
    const field = faker.database.column()
    const { getByTestId } = makeSut(field, label)
    const el = getByTestId('textField')
    expect(el.childElementCount).toBe(2)
  })

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
