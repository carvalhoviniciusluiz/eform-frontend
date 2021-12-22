import React from 'react'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import { RemoteAuthentication } from '@/data/usecases/authentication'
import { AxiosHttpClient } from '@/infra/http'
import { Login } from '@/presentation/pages'

export const makeLogin = () => {
  const url = 'http://localhost:3333/auth'
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('credential').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])
  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
