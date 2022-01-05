import {
  ChangeEventHandler,
  MouseEventHandler,
  ReactElement,
  useState
} from 'react'
import { EyeCloseIcon, EyeOpenIcon } from '@/presentation/assets'
import { TextField } from '@/presentation/components'
import './password-field-styles.scss'

type TextFieldProps = React.HTMLAttributes<HTMLDivElement> & {
  label?: string | ReactElement
  type?: string
  name: string
  onClick?: MouseEventHandler
  onChange?: ChangeEventHandler
  errorMessage?: string
}

const PasswordField = (props: TextFieldProps) => {
  const [isHidden, setHidden] = useState(true)

  const handleClick = () => {
    setHidden(!isHidden)
  }

  return (
    <div className='passwordField__content'>
      <TextField
        {...props}
        type={isHidden ? 'password' : 'text'}
        showIcon={false}
      />

      <span
        onClick={handleClick}
        style={{ top: props.label ? 37 : 12 }}
        data-testid='toggle-button'
      >
        {isHidden ? <EyeCloseIcon size={22} /> : <EyeOpenIcon size={22} />}
      </span>
    </div>
  )
}

export default PasswordField
