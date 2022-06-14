import {ExchangeType} from "../enums/exchangeType";

export class ApiKeyDto {
  private label: string;
  private apiKey: string;
  private secretKey: string
  private exchange: ExchangeType

  constructor(label: string, apiKey: string, secretKey: string, exchange: ExchangeType) {
    this.label = label;
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.exchange = exchange;
  }
}
