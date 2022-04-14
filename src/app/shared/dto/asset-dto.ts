import {Quotation} from "../enums/quotation";

export interface AssetDto {
  name: string;
  fullName: string;
  free: number;
  frozen: number;
  price: number;
  priceChange: number;
  balance: number;
  iconIndex: number;
  quotation: Quotation;
}
