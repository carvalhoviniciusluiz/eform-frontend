import { useState, ReactNode } from 'react'
import './accordion-styles.scss'

type AccordionProps = {
  title: string
  isOpen?: boolean
  children?: ReactNode
}

const Accordion = ({ title, isOpen = false, children }: AccordionProps) => {
  const [open, setOpen] = useState(isOpen)

  const handleOpenClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <button
        className={`accordion ${open ? 'active' : ''}`}
        onClick={handleOpenClick}
        data-testid='accordion-button'
      >
        {title}
      </button>
      <div
        className={`panel ${open ? 'open' : ''}`}
        data-testid='accordion-panel'
      >
        {children}
      </div>
    </>
  )
}

export default Accordion
