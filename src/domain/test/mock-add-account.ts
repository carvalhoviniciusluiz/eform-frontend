import * as faker from 'faker'
import { GrantType, AddAccountParams } from '@/domain'

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
