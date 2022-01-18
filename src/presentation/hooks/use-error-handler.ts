import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccessDeniedError } from '@/domain'
import { ApiContext } from '@/presentation/contexts'

type CallBackType = (error: Error) => void
type ResultType = CallBackType

export const useErrorHandler = (callback: CallBackType): ResultType => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useContext(ApiContext)
  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined)
      navigate('/login')
    } else {
      callback(error)
    }
  }
}
