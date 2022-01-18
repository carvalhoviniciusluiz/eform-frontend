import { ChangeEventHandler, MouseEventHandler, ReactElement } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import { RiErrorWarningLine } from 'react-icons/ri'
import './text-field-styles.scss'

type TextFieldProps = React.HTMLAttributes<HTMLDivElement> & {
  label?: string | ReactElement
  type?: string
  name: string
  onClick?: MouseEventHandler
  onChange?: ChangeEventHandler
  errorMessage?: string
  showIcon?: boolean
}

const TextField = (props: TextFieldProps) => {
  const {
    label,
    type = 'text',
    name,
    errorMessage,
    showIcon = true,
    ...rest
  } = props

  const classes = 'textField textField__lg textField__solid'

  const enableInput = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.readOnly = false
  }

  return (
    <div {...rest} className='textField__container' data-testid='textField'>
      {label && <label>{label}</label>}
      <div className='input-wrap'>
        <input
          className={errorMessage ? `${classes} error` : classes}
          type={type}
          name={name}
          readOnly
          onFocus={enableInput}
          autoComplete='off'
          data-testid={name}
        />
        {showIcon && (
          <span
            className={errorMessage ? 'error' : 'check'}
            title={errorMessage}
            data-testid={`${name}-status`}
          >
            {errorMessage ? <RiErrorWarningLine /> : <BsCheckLg />}
          </span>
        )}
      </div>
      {!showIcon && (
        <div className='textField__error' data-testid={`${name}-status`}>
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export default TextField
