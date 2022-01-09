import {
  RightIcon
  // CodeSkeleton
} from '@/presentation/assets'
import { ImageGroup } from '@/presentation/components'
import './data-grid-syles.scss'

const DataList = () => {
  return (
    <table>
      <thead className='d-none'>
        <tr>
          <th>Campaing</th>
          <th>Status</th>
          <th>Team</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <div className='column min-w-200px'>
              <div className='color-panel'></div>
              <strong className='text-dark'>Happy Christmas</strong>
              <span className='p'>Created on 24 Dec 21</span>
            </div>
          </td>
          <td className='table-td-center'>
            <span className='badge badge-primary'>Published</span>
          </td>
          <td className='table-td-center'>
            <ImageGroup
              assets={[
                'https://preview.keenthemes.com/good/assets/media/avatars/150-1.jpg',
                'https://preview.keenthemes.com/good/assets/media/avatars/150-15.jpg',
                'https://preview.keenthemes.com/good/assets/media/avatars/150-8.jpg',
                'https://preview.keenthemes.com/good/assets/media/avatars/150-26.jpg',
                {
                  char: 'N',
                  color: '#4fc9da',
                  backgroundColor: '#ddf8fc'
                }
              ]}
              count={2}
            />
          </td>
          <td className='table-td-right'>
            <div className='column min-w-180px p-l-0'>
              <strong className='text-dark'>03 Feb 22 - 14 Feb 22</strong>
              <span className='p'>Date range</span>
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
      </tbody>
    </table>
  )
}

export default DataList
