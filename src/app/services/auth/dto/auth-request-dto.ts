export class AuthRequestDto {
  private email: string
  private password: string

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
