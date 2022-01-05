import { memo } from 'react'
import './spinner-styles.scss'

type SpinnerProps = React.HTMLAttributes<HTMLDivElement>

const Spinner = (props: SpinnerProps) => {
  return (
    <div
      {...props}
      className={['spinner', props.className].join(' ')}
      data-testid='spinner'
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default memo(Spinner)
