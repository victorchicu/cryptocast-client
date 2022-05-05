import {ExchangeProvider} from "../enums/exchange-provider";

export class SigninDto {
  private email: string
  private password: string
  private exchangeProvider: ExchangeProvider

  constructor(email: string, password: string, exchangeProvider: ExchangeProvider) {
    this.email = email;
    this.password = password;
    this.exchangeProvider = exchangeProvider;
  }
}
