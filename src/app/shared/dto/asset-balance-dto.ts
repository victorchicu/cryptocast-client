import {Quotation} from "../enums/quotation";

export interface AssetBalanceDto {
  asset: string;
  fullName: string;
  iconIndex: number;
  free: number;
  frozen: number;
  price: number;
  balance: number;
  quotation: Quotation;
}
