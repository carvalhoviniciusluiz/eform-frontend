import { useContext } from 'react'
import { FormContext } from '@/presentation/pages/form-list/components'
import './error-styles.scss'

const FormError = () => {
  const { state, setState } = useContext(FormContext)

  const handleReload = (): void => {
    setState((preState) => ({ forms: [], error: '', reload: !preState.reload }))
  }

  return (
    <div className='error-wrap'>
      <span data-testid='error'>{state.error}</span>
      <button onClick={handleReload} data-testid='reload'>
        Try again
      </button>
    </div>
  )
}

export default FormError
