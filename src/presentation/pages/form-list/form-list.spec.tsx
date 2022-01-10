import { render, screen } from '@testing-library/react'
import { FormModel, LoadFormList } from '@/domain'
import { FormList } from '@/presentation/pages'

class LoadFormListSpy implements LoadFormList {
  callsCount = 0
  async loadAll(): Promise<FormModel[]> {
    this.callsCount++
    return []
  }
}

type SutTypes = {
  loadFormListSpy: LoadFormListSpy
}

const makeSut = (): SutTypes => {
  const loadFormListSpy = new LoadFormListSpy()
  render(<FormList loadFormList={loadFormListSpy} />)
  return {
    loadFormListSpy
  }
}

describe('FormList Component', () => {
  test('should present skeleton on start', () => {
    makeSut()
    const table = screen.getByTestId('table-responsive')
    expect(table.childNodes.length).toBe(1)
    expect(table.querySelector('svg').getAttribute('role')).toBe('img')
  })

  test('should call LoadFormList', () => {
    const { loadFormListSpy } = makeSut()
    expect(loadFormListSpy.callsCount).toBe(1)
  })
})
