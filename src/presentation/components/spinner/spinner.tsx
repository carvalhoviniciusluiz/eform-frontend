import './spinner-styles.scss'

type SpinnerProps = React.HTMLAttributes<HTMLDivElement>

const Spinner = (props: SpinnerProps) => {
  return (
    <div {...props} className={['spinner', props.className].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default Spinner
