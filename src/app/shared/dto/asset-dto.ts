import {Exchange} from "../enums/exchange";

export interface AssetDto {
  name: string;
  fullName: string;
  apiKeyName: string;
  exchange: Exchange;
  totalFunds: number;
  fundsAvailable: number;
  usedInAnyOutstandingOrders: number;
}
