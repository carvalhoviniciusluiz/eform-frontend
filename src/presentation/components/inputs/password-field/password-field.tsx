import {
  ChangeEventHandler,
  MouseEventHandler,
  ReactElement,
  useState
} from 'react'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { TextField } from '@/presentation/components/inputs'
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
    <div className='passwordField__contant'>
      <TextField
        {...props}
        type={isHidden ? 'password' : 'text'}
        name='field'
      />

      <span onClick={handleClick} style={{ top: props.label ? 37 : 12 }}>
        {isHidden ? (
          <FaEyeSlash size={22}></FaEyeSlash>
        ) : (
          <FaEye size={22}></FaEye>
        )}
      </span>
    </div>
  )
}

export default PasswordField
