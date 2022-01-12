import { render, screen } from '@testing-library/react'
import { FormModel, FormStatusEnum } from '@/domain'
import { mockFormItemModel } from '@/domain/test'
import { FormItem } from '@/presentation/pages/form-list/components'

type SutTypes = {
  formItemSpy: FormModel
}

const makeSut = (status = FormStatusEnum.REVIEWED): SutTypes => {
  const formItemSpy = mockFormItemModel(status)
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
    expect(screen.getByTestId('item-status')).toHaveTextContent('Published')
  })
})
