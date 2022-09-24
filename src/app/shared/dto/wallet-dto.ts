import {Exchange} from "../enums/exchange";

export class WalletDto {
  public label: string;
  public apiKey: string;
  public secretKey: string
  public exchange: Exchange

  constructor(label: string, apiKey: string, secretKey: string, exchange: Exchange) {
    this.label = label;
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.exchange = exchange;
  }
}
