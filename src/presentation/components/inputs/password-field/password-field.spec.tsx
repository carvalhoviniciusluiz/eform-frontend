import { render, RenderResult } from '@testing-library/react'
import * as faker from 'faker'
import { PasswordField } from '@/presentation/components/inputs'

const makeSut = (fieldName: string): RenderResult => {
  return render(<PasswordField name={fieldName} />)
}

describe('PasswordField Component', () => {
  test('should begin with type equal to password', () => {
    const field = faker.database.column()
    const { getByTestId } = makeSut(field)
    const input = getByTestId(field) as HTMLInputElement
    expect(input.type).toBe('password')
  })
})
