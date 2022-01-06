import { Method } from 'axios'
import * as faker from 'faker'

export const mockInvalidCredentialsError = (url: string): void => {
  cy.intercept('POST', url, (req) => {
    req.reply({
      statusCode: 401
    })
  }).as('request')
}

export const mockEmailInUseError = (url: string): void => {
  cy.intercept('POST', url, (req) => {
    req.reply({
      statusCode: 403
    })
  }).as('request')
}

export const mockUnexpectedError = (url: string, method: Method): void => {
  cy.intercept(method, url, (req) => {
    req.reply({
      statusCode: faker.helpers.randomize([400, 404, 500])
    })
  }).as('request')
}

export const mockOK = (url: string, method: Method, body?: any): void => {
  cy.intercept(method, url, (req) => {
    req.reply({
      statusCode: 201,
      body
    })
  }).as('request')
}
