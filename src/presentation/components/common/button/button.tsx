import './button-styles.scss'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = (props: ButtonProps) => {
  const { disabled, children } = props

  return (
    <button
      {...props}
      className={['btn', props.className].join(' ')}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
