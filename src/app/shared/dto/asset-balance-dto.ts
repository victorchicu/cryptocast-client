import {Quotation} from "../enums/quotation";

export interface AssetBalanceDto {
  asset: string;
  fullName: string;
  free: number;
  frozen: number;
  price: number;
  priceChange: number;
  balance: number;
  quotation: Quotation;
}
