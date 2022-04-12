import {Quotation} from "../enums/quotation";

export interface AssetDto {
  asset: string;
  fullName: string;
  free: number;
  frozen: number;
  price: number;
  priceChange: number;
  balance: number;
  iconIndex: number;
  quotation: Quotation;
}
