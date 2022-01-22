import {ExchangeProvider} from "../../../shared/enums/exchange-provider";

export class LoginRequestDto {
  private email: string
  private password: string
  private exchangeProvider: ExchangeProvider

  constructor(email: string, password: string, exchangeProvider: ExchangeProvider) {
    this.email = email;
    this.password = password;
    this.exchangeProvider = exchangeProvider;
  }
}
