import { memo } from 'react'
import { BsThreeDots } from 'react-icons/bs'

type ThreeDotsIconProps = {
  size?: number
}

const ThreeDotsIcon = ({ size }: ThreeDotsIconProps) => {
  return <BsThreeDots size={size} />
}

export default memo(ThreeDotsIcon)
