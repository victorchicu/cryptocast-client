import {Exchange} from "../enums/exchange";

export class ApiKeyDto {
  private label: string;
  private apiKey: string;
  private secretKey: string
  private exchange: Exchange

  constructor(label: string, apiKey: string, secretKey: string, exchange: Exchange) {
    this.label = label;
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.exchange = exchange;
  }
}
