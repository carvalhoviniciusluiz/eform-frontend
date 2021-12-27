import * as faker from 'faker'
import { GrantType } from '@/domain'
import { AddAccountParams } from '../usecases'

export const mockAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password()
  return {
    grant_type: GrantType.CREATE_CREDENTIALS,
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    document_number: faker.random.alphaNumeric(11),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    password
  }
}
