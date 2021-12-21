export class RequiredFieldError extends Error {
  constructor(message = 'Required field') {
    super(message)
    this.name = RequiredFieldError.name
  }
}
