import { ChangeEventHandler, MouseEventHandler, ReactElement } from 'react'
import './text-field-styles.scss'

type TextFieldProps = React.HTMLAttributes<HTMLDivElement> & {
  label?: string | ReactElement
  type?: string
  name: string
  onClick?: MouseEventHandler
  onChange?: ChangeEventHandler
  errorMessage?: string
}

const TextField = (props: TextFieldProps) => {
  const { label, type = 'text', name, errorMessage, ...rest } = props

  const classes = 'textField textField__lg textField__solid'

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
