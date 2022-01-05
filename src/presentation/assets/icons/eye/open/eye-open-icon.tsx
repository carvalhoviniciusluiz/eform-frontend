import { memo } from 'react'
import { FaEye } from 'react-icons/fa'

type EyeOpenIconProps = {
  size?: number
}

const EyeOpenIcon = (props: EyeOpenIconProps) => <FaEye {...props} />

export default memo(EyeOpenIcon)
