import * as faker from 'faker'

describe('Login', () => {
  const baseUrl: string = Cypress.config().baseUrl

  beforeEach(() => {
    cy.visit('login')
  })

  it('should load with correct initial state', () => {
    cy.getByTestId('credential').should('have.attr', 'readOnly')
    cy.getByTestId('credential-status')
      .should('have.attr', 'title', 'Required field')
      .should('have.class', 'error')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Required field')
      .should('have.class', 'error')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('main-error').should('not.exist')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('credential').focus().type(faker.random.word())
    cy.getByTestId('credential-status')
      .should('have.attr', 'title', 'Invalid field')
      .should('have.class', 'error')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Invalid field')
      .should('have.class', 'error')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('main-error').should('not.exist')
  })

  it('should present valid state if form is valid', () => {
    cy.getByTestId('credential').focus().type(faker.internet.email())
    cy.getByTestId('credential-status').should('have.class', 'check')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('password-status').should('have.class', 'check')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('main-error').should('not.exist')
  })

  it('should present UnexpectedError on 400', () => {
    cy.intercept('POST', '/auth', (req) => {
      req.reply({
        statusCode: 400
      })
    })
    cy.getByTestId('credential').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error')
      .should('exist')
      .should('contain.text', 'Something went wrong. Please try again soon')
  })

  it('should present InvalidCredentialsError on 401', () => {
    cy.intercept('POST', '/auth', (req) => {
      req.reply({
        statusCode: 401
      })
    })
    cy.getByTestId('credential').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(8))
    cy.getByTestId('submit').click()
    cy.getByTestId('main-error').should('exist')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Invalid credentials')
    cy.url().should('eq', baseUrl + '/login')
  })

  it('should present UnexpectedError if invlaid data is returned', () => {
    cy.intercept('POST', '/auth', (req) => {
      req.reply({
        statusCode: 201,
        body: {
          invalidProperty: faker.datatype.uuid()
        }
      })
    })
    cy.getByTestId('credential').focus().type(faker.internet.email())
    cy.getByTestId('password')
      .focus()
      .type(faker.random.alphaNumeric(5))
      .type('{enter}')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error')
      .should('exist')
      .should('contain.text', 'Something went wrong. Please try again soon')
  })

  it('should present save accessToken if valid credentials are provided', () => {
    cy.intercept('POST', '/auth', (req) => {
      req.reply({
        statusCode: 201,
        body: {
          data: {
            accessToken: faker.datatype.uuid(),
            accessTokenExpiresIn: 19,
            refreshToken: faker.datatype.uuid(),
            refreshTokenExpiresIn: 84,
            tokenType: 'bearer'
          }
        }
      })
    })
    cy.getByTestId('credential').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(8))
    cy.getByTestId('submit').click()
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    cy.url().should('eq', baseUrl + '/')
    cy.window().then((window) =>
      assert.isOk(window.localStorage.getItem('@eform:account'))
    )
  })

  it('should perevent multilple submit', () => {
    cy.intercept('POST', '/auth', (req) => {
      req.reply({
        statusCode: 201,
        body: {
          data: {
            accessToken: faker.datatype.uuid(),
            accessTokenExpiresIn: 19,
            refreshToken: faker.datatype.uuid(),
            refreshTokenExpiresIn: 84,
            tokenType: 'bearer'
          }
        }
      })
    }).as('request')
    cy.getByTestId('credential').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(8))
    cy.getByTestId('submit').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })
})
