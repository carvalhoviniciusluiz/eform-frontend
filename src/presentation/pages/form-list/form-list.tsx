import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccessDeniedError, LoadFormList } from '@/domain'
import {
  Header,
  Sidebar,
  CardNavigation,
  Card
} from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import {
  FormContext,
  FormError,
  FormListItems
} from '@/presentation/pages/form-list/components'
import './form-list-styles.scss'

type FormListProps = {
  loadFormList: LoadFormList
}

const FormList = ({ loadFormList }: FormListProps) => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useContext(ApiContext)

  const [state, setState] = useState({
    forms: [] as LoadFormList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadFormList
      .loadAll()
      .then((forms) => setState((prevState) => ({ ...prevState, forms })))
      .catch((error) => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(undefined)
          navigate('/login')
        } else {
          setState((prevState) => ({ ...prevState, error: error.message }))
        }
      })
  }, [state.reload])

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
                <div
                  className='table-responsive'
                  data-testid='table-responsive'
                >
                  <FormContext.Provider value={{ state, setState }}>
                    {state.error ? <FormError /> : <FormListItems />}
                  </FormContext.Provider>
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
