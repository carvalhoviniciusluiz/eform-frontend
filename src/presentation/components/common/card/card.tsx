import { ReactNode } from 'react'
import './card-styles.scss'

type CardProps = {
  children?: ReactNode
}

const Card = ({ children }: CardProps) => {
  return (
    <div className='card'>
      <div className='card__body'>{children}</div>
    </div>
  )
}

export default Card
