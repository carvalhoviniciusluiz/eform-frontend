import { memo } from 'react'

type UpIconProps = {
  fill?: string
}

const DownIcon = ({ fill = 'black' }: UpIconProps) => (
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
      width='13'
      height='2'
      rx='1'
      transform='rotate(-90 11 18)'
    ></rect>
    <path d='M11.4343 15.4343L7.25 11.25C6.83579 10.8358 6.16421 10.8358 5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75L11.2929 18.2929C11.6834 18.6834 12.3166 18.6834 12.7071 18.2929L18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25C17.8358 10.8358 17.1642 10.8358 16.75 11.25L12.5657 15.4343C12.2533 15.7467 11.7467 15.7467 11.4343 15.4343Z'></path>
  </svg>
)

export default memo(DownIcon)
