import { render, screen } from '@testing-library/react'
import { FormList } from '@/presentation/pages'

const makeSut = (): void => {
  render(<FormList />)
}

describe('FormList Component', () => {
  test('should present skeleton on start', () => {
    makeSut()
    const table = screen.getByTestId('table-responsive')
    expect(table.childNodes.length).toBe(1)
    expect(table.querySelector('svg').getAttribute('role')).toBe('img')
  })
})
