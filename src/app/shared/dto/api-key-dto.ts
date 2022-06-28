import {ExchangeType} from "../enums/exchangeType";

export class ApiKeyDto {
  public label: string;
  public apiKey: string;
  public secretKey: string
  public exchange: ExchangeType

  constructor(label: string, apiKey: string, secretKey: string, exchange: ExchangeType) {
    this.label = label;
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.exchange = exchange;
  }
}
