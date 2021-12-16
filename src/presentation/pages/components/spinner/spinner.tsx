import React from 'react'

import './spinner-styles.scss'

type SpinnerProps = React.HTMLAttributes<HTMLDivElement>

const Spinner = (props: SpinnerProps) => {
  return (
    <div
      {...props}
      className={['lds-dual-ring', props.className].join(' ')}
    ></div>
  )
}

export default Spinner
