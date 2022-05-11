import {ExchangeProvider} from "../enums/exchange-provider";

export interface AssetDto {
  name: string;
  fullName: string;
  provider: ExchangeProvider;
  totalFunds: string;
  fundsAvailable: string;
  usedInAnyOutstandingOrders: string;
}
