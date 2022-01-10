import { render, screen } from '@testing-library/react'
import { FormList } from '@/presentation/pages'

describe('FormList Component', () => {
  test('should present skeleton on start', () => {
    render(<FormList />)
    const table = screen.getByTestId('table-responsive')
    expect(table.childNodes.length).toBe(1)
    expect(table.querySelector('svg').getAttribute('role')).toBe('img')
  })
})
