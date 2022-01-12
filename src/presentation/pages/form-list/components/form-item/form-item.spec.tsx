import { render, screen } from '@testing-library/react'
import { FormAsset, FormModel, FormStatusEnum } from '@/domain'
import { mockFormItemModel } from '@/domain/test'
import { FormItem } from '@/presentation/pages/form-list/components'

type SutTypes = {
  formItemSpy: FormModel
}

type ConsumerProps = {
  avatars: FormAsset[]
  total: number
}

const makeSut = (
  status = FormStatusEnum.REVIEWED,
  consumers?: ConsumerProps
): SutTypes => {
  const formItemSpy = mockFormItemModel(status, consumers)
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
      formItemSpy.createdAt.toUTCString()
    )
    expect(screen.getByTestId('image-group').children).toHaveLength(6)
    expect(screen.getByTestId('item-status')).toHaveTextContent('Reviewed')
    expect(screen.getByTestId('item-updated-at')).toHaveTextContent(
      formItemSpy.updatedAt.toUTCString()
    )
  })

  test('should present published state', () => {
    makeSut(FormStatusEnum.PUBLISHED)
    const el = screen.getByTestId('item-status')
    expect(el).toHaveTextContent('Published')
    expect(el.children).toHaveLength(1)
  })

  test('should present removed state', () => {
    makeSut(FormStatusEnum.REMOVED)
    const el = screen.getByTestId('item-status')
    expect(el).toHaveTextContent('Removed')
    expect(el.children).toHaveLength(1)
  })

  test('should present 1 element on image group', () => {
    const consumers = {
      avatars: [],
      total: 0
    }
    makeSut(FormStatusEnum.REVIEWED, consumers)
    expect(screen.getByTestId('image-group').children).toHaveLength(1)
  })
})
