import { ChangeEventHandler, MouseEventHandler, ReactElement } from 'react'
import './text-field-styles.scss'

type TextFieldProps = React.HTMLAttributes<HTMLDivElement> & {
  label?: string | ReactElement
  type?: string
  name: string
  onClick?: MouseEventHandler
  onChange?: ChangeEventHandler
  value?: string | number | undefined
  errorMessage?: string
}

const TextField = (props: TextFieldProps) => {
  const { label, type = 'text', name, value, errorMessage, ...rest } = props

  const classes = 'form-control form-control-lg form-control-solid'

  const enableInput = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.readOnly = false
  }

  return (
    <div {...rest} className='textField__container'>
      {label && label}
      <input
        className={errorMessage ? `${classes} error` : classes}
        type={type}
        name={name}
        value={value}
        readOnly
        onFocus={enableInput}
        autoComplete='off'
        data-testid={name}
      />
      {errorMessage && (
        <div className='field-error' data-testid={`${name}-status`}>
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export default TextField
