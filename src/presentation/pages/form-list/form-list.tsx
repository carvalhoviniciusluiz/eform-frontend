import { useEffect } from 'react'
import { LoadFormList } from '@/domain'
import { CodeSkeleton } from '@/presentation/assets'
import {
  Header,
  Sidebar,
  CardNavigation,
  Card
} from '@/presentation/components'
import './form-list-styles.scss'

type FormListProps = {
  loadFormList: LoadFormList
}

const FormList = ({ loadFormList }: FormListProps) => {
  useEffect(() => {
    ;(async () => {
      loadFormList.loadAll()
    })()
  }, [])

  return (
    <div className='formListWrap'>
      <Sidebar />

      <main className='main'>
        <Header />

        <div className='content'>
          <CardNavigation />

          <div className='dataGrid'>
            <Card>
              <div className='dataGrid__header'>
                <div className='dataGrid__options'>
                  <div className='option active'>All Questionnaires (7)</div>
                  <div className='option'>Published (2)</div>
                  <div className='option'>Removed (1)</div>
                </div>

                <div className='dataGrid__actions'>
                  <a href='#'>Create Quiz</a>
                </div>
              </div>
              <div className='dataGrid__body'>
                <div className='separator'></div>
                <div className='table-responsive'>
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

                    <tbody data-testid='tbody'>
                      <tr>
                        <td>
                          <CodeSkeleton />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default FormList
