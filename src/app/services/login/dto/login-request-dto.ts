import {ExchangeType} from "../../../shared/enums/exchange-type";

export class LoginRequestDto {
  private email: string
  private password: string
  private exchange: ExchangeType

  constructor(email: string, password: string, exchange: ExchangeType) {
    this.email = email;
    this.password = password;
    this.exchange = exchange;
  }
}
