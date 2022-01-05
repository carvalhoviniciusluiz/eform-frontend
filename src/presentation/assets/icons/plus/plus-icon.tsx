import { memo } from 'react'

type PlusIconProps = {
  fill?: string
}

const PlusIcon = ({ fill = 'black' }: PlusIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill={fill}
  >
    <rect
      opacity='0.5'
      x='11'
      y='18'
      width='12'
      height='2'
      rx='1'
      transform='rotate(-90 11 18)'
    ></rect>
    <rect x='6' y='11' width='12' height='2' rx='1'></rect>
  </svg>
)

export default memo(PlusIcon)
