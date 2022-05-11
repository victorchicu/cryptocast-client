import {ExchangeProvider} from "../enums/exchange-provider";

export class SignupDto {
  private email: string
  private password: string

  constructor(email: string, password: string,) {
    this.email = email;
    this.password = password;
  }
}
