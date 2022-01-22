import {ExchangeProvider} from "../enums/exchange-provider";

export class SignupDto {
  private email: string
  private password: string
  private apiKey: string
  private secretKey: string
  private exchangeProvider: ExchangeProvider

  constructor(
    email: string,
    password: string,
    apiKey: string,
    secretKey: string,
    exchangeProvider: ExchangeProvider
  ) {
    this.email = email;
    this.password = password;
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.exchangeProvider = exchangeProvider;
  }
}
