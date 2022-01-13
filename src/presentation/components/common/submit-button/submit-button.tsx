import { Spinner } from '@/presentation/assets'
import { Button } from '@/presentation/components'
import './submit-button-styles.scss'

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: number
}

const SubmitButton = (props: SubmitButtonProps) => {
  const { loading, children } = props

  return (
    <Button
      {...props}
      type='submit'
      className='btn-lg btn-primary submit'
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
    </Button>
  )
}

export default SubmitButton
