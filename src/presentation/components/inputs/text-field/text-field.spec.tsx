import React from 'react'
import { render } from '@testing-library/react'
import { TextField } from '@/presentation/components/inputs'

describe('TextField Component', () => {
  test('should begin with readOnly', () => {
    const { getByTestId } = render(<TextField name='field'></TextField>)
    const input = getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
