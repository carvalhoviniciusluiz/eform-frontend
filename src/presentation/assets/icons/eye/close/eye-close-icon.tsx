import { memo } from 'react'
import { FaEyeSlash } from 'react-icons/fa'

type EyeCloseIconProps = {
  size?: number
}

const EyeCloseIcon = (props: EyeCloseIconProps) => <FaEyeSlash {...props} />

export default memo(EyeCloseIcon)
