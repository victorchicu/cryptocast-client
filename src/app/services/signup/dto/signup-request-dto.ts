export class SignupRequestDto {
  private email: string
  private password: string
  private apiKey: string
  private secretKey: string

  constructor(email: string, password: string, apiKey: string, secretKey: string) {
    this.email = email;
    this.password = password;
    this.apiKey = apiKey;
    this.secretKey = secretKey;
  }
}
