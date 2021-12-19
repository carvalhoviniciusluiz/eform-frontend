import { Spinner } from '@/presentation/components'
import './submit-button-styles.scss'

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

const SubmitButton = (props: SubmitButtonProps) => {
  const { loading } = props
  return (
    <button {...props} type='submit' className='btn btn-lg btn-primary submit'>
      {loading ? (
        <span className='loading'>
          Please wait...
          <Spinner />
        </span>
      ) : (
        <span className='label'>Continue</span>
      )}
    </button>
  )
}

export default SubmitButton
