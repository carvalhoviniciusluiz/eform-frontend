import { render, screen } from '@testing-library/react'
import { mockRemoteFormItemModel } from '@/domain/test'
import { LoadFormList } from '@/domain/usecases'
import { FormItem } from '@/presentation/pages/form-list/components'

type SutTypes = {
  formItemSpy: LoadFormList.Model
}

type ConsumerProps = {
  avatars: LoadFormList.Avatar[]
  total: number
}

const makeSut = (
  status = LoadFormList.Status.REVIEWED,
  consumers?: ConsumerProps
): SutTypes => {
  const formItemSpy = mockRemoteFormItemModel(status, consumers)
  render(
    <table>
      <tbody>
        <FormItem item={formItemSpy} />
      </tbody>
    </table>
  )
  return {
    formItemSpy
  }
}

describe('FormItem Component', () => {
  test('should present initial state', () => {
    const { formItemSpy } = makeSut()
    expect(screen.getByTestId('item-name')).toHaveTextContent(formItemSpy.name)
    expect(screen.getByTestId('item-created-at')).toHaveTextContent(
      formItemSpy.createdAt.toString()
    )
    expect(screen.getByTestId('image-group').children).toHaveLength(6)
    expect(screen.getByTestId('item-status')).toHaveTextContent('Reviewed')
    expect(screen.getByTestId('item-updated-at')).toHaveTextContent(
      formItemSpy.updatedAt.toString()
    )
  })

  test('should present published state', () => {
    makeSut(LoadFormList.Status.PUBLISHED)
    const el = screen.getByTestId('item-status')
    expect(el).toHaveTextContent('Published')
    expect(el.children).toHaveLength(1)
  })

  test('should present removed state', () => {
    makeSut(LoadFormList.Status.REMOVED)
    const el = screen.getByTestId('item-status')
    expect(el).toHaveTextContent('Removed')
    expect(el.children).toHaveLength(1)
  })

  test('should present 1 element on image group', () => {
    const consumers = {
      avatars: [],
      total: 0
    }
    makeSut(LoadFormList.Status.REVIEWED, consumers)
    expect(screen.getByTestId('image-group').children).toHaveLength(1)
  })
})
