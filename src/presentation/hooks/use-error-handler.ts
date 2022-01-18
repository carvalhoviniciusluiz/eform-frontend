import { AccessDeniedError } from '@/domain'
import { useLogout } from '@/presentation/hooks'

type CallBackType = (error: Error) => void
type ResultType = CallBackType

export const useErrorHandler = (callback: CallBackType): ResultType => {
  const handleLogout = useLogout()
  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      handleLogout()
    } else {
      callback(error)
    }
  }
}
