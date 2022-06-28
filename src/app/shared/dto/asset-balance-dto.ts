import {ExchangeType} from "../enums/exchangeType";

export interface AssetBalanceDto {
  name: string;
  fullName: string;
  exchange: ExchangeType;
  totalFunds: number;
  fundsAvailable: number;
  usedInAnyOutstandingOrders: number;
}
