import { createContext } from 'react'
import { AccountModel } from '@/domain'

type Props = {
  setCurrentAccount?: (account: AccountModel) => void
}

export default createContext<Props>(null)
