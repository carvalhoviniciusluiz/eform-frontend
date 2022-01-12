import { useContext } from 'react'
import { FormModel } from '@/domain'
import {
  FormContext,
  FormItem,
  FormItemEmpty
} from '@/presentation/pages/form-list/components'

const FormListItems = () => {
  const { state } = useContext(FormContext)

  return (
    <table data-testid='table'>
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
        {state.forms.length ? (
          state.forms.map((form: FormModel) => (
            <FormItem key={form.id} item={form} />
          ))
        ) : (
          <FormItemEmpty />
        )}
      </tbody>
    </table>
  )
}

export default FormListItems
