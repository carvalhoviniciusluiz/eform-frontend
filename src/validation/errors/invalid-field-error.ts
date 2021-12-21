export class InvalidaFieldError extends Error {
  constructor(message = 'Invalid field') {
    super(message)
    this.name = InvalidaFieldError.name
  }
}
