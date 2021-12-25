export class EmailInUseError extends Error {
  constructor(message = 'this is the email already in use') {
    super(message)
    this.name = EmailInUseError.name
  }
}
