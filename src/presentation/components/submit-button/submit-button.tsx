import './submit-button-styles.scss'

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <button {...props} type='submit' className='btn btn-lg btn-primary submit'>
      <span className='label'>Continue</span>
    </button>
  )
}

export default SubmitButton
