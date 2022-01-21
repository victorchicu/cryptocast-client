import {ExchangeType} from "../../../shared/enums/exchange-type";

export class SignupDto {
  private email: string
  private password: string
  private apiKey: string
  private secretKey: string
  private exchange: ExchangeType

  constructor(
    email: string,
    password: string,
    apiKey: string,
    secretKey: string,
    exchange: ExchangeType
  ) {
    this.email = email;
    this.password = password;
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.exchange = exchange;
  }
}
