import {ExchangeType} from "../enums/exchangeType";

export interface WalletBalanceDto {
  name: string;
  fullName: string;
  exchange: ExchangeType;
  totalFunds: number;
  fundsAvailable: number;
  usedInAnyOutstandingOrders: number;
}
