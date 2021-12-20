import { Spinner } from '@/presentation/components'
import './submit-button-styles.scss'

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: number
}

const SubmitButton = (props: SubmitButtonProps) => {
  const { loading } = props
  return (
    <button
      {...props}
      type='submit'
      className='btn btn-lg btn-primary submit'
      data-testid='error-wrap'
    >
      {loading ? (
        <span className='label loading'>
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
