import {Exchange} from "../enums/exchange";

export interface WalletBalanceDto {
  name: string;
  fullName: string;
  exchange: Exchange;
  totalFunds: number;
  fundsAvailable: number;
  usedInAnyOutstandingOrders: number;
}
