import { render, screen, waitFor } from '@testing-library/react'
import { FormModel, LoadFormList } from '@/domain'
import { mockFormListModel } from '@/domain/test'
import { FormList } from '@/presentation/pages'

class LoadFormListSpy implements LoadFormList {
  callsCount = 0
  forms = mockFormListModel(3)
  async loadAll(): Promise<FormModel[]> {
    this.callsCount++
    return this.forms
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
  test('should present skeleton on start', async () => {
    makeSut()
    const tbody = screen.getByTestId('tbody')
    expect(tbody.children).toHaveLength(1)
    expect(tbody.querySelector('svg').getAttribute('role')).toBe('img')
    await waitFor(() => tbody)
  })

  test('should call LoadFormList', async () => {
    const { loadFormListSpy } = makeSut()
    expect(loadFormListSpy.callsCount).toBe(1)
    const tbody = screen.getByTestId('tbody')
    await waitFor(() => tbody)
  })

  test('should render FormItems on success', async () => {
    makeSut()
    const tbody = screen.getByTestId('tbody')
    await waitFor(() => tbody)
    expect(tbody.children).toHaveLength(3)
  })
})
