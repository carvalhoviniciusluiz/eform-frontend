import { LoadFormList } from '@/domain/usecases'
import { RightIcon } from '@/presentation/assets'
import { ImageGroup } from '@/presentation/components'
import './item-styles.scss'

type FormItemProps = {
  item: LoadFormList.Model
}

const FormItem = (props: FormItemProps) => {
  const { item } = props
  return (
    <tr>
      <td>
        <div className='column min-w-200px'>
          <div className='color-panel'></div>
          <strong className='text-dark' data-testid='item-name'>
            {item.name}
          </strong>
          <span className='p' data-testid='item-created-at'>
            {item.createdAt.toUTCString()}
          </span>
        </div>
      </td>
      <td className='table-td-center' data-testid='item-status'>
        {item.status === LoadFormList.Status.REVIEWED && (
          <span className='badge badge-success'>Reviewed</span>
        )}
        {item.status === LoadFormList.Status.PUBLISHED && (
          <span className='badge badge-primary'>Published</span>
        )}
        {item.status === LoadFormList.Status.REMOVED && (
          <span className='badge badge-warning'>Removed</span>
        )}
      </td>
      <td className='table-td-center'>
        <ImageGroup
          avatars={item.consumers.avatars}
          total={item.consumers.total}
        />
      </td>
      <td className='table-td-right'>
        <div className='column min-w-180px p-l-0'>
          <strong className='text-dark' data-testid='item-updated-at'>
            {item.updatedAt.toUTCString()}
          </strong>
          <span className='p'>Last update</span>
        </div>
      </td>
      <td className='table-td-right'>
        <button className='btn'>
          <span>
            <RightIcon fill='#8e887a' />
          </span>
        </button>
      </td>
    </tr>
  )
}

export default FormItem
