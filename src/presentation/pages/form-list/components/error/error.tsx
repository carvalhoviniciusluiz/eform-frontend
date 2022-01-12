import { useContext } from 'react'
import { FormContext } from '@/presentation/pages/form-list/components'
import './error-styles.scss'

const FormError = () => {
  const { state } = useContext(FormContext)
  return (
    <div className='error-wrap'>
      <span data-testid='error'>{state.error}</span>
      <button>Reload</button>
    </div>
  )
}

export default FormError
