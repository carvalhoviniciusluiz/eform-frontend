import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { TextField } from '@/presentation/components/inputs'

const makeSut = (): RenderResult => {
  return render(<TextField name='field' />)
}

describe('TextField Component', () => {
  test('should begin with readOnly', () => {
    const { getByTestId } = makeSut()
    const input = getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
