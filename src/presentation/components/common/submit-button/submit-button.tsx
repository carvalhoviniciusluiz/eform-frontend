import { Spinner } from '@/presentation/components'
import './submit-button-styles.scss'

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: number
}

const SubmitButton = (props: SubmitButtonProps) => {
  const { loading, disabled, children } = props

  return (
    <button
      {...props}
      type='submit'
      className='btn btn-lg btn-primary submit'
      disabled={disabled}
      data-testid='submit'
    >
      {loading ? (
        <span className='label loading' data-testid='label-wait'>
          Please wait...
          <Spinner />
        </span>
      ) : (
        <span className='label' data-testid='label-continue'>
          {children}
        </span>
      )}
    </button>
  )
}

export default SubmitButton
