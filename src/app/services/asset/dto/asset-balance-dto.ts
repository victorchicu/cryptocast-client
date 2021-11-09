import {Quotation} from "../../../shared/enums/quotation";

export interface AssetBalanceDto {
  asset: string;
  fullName: string;
  iconIndex: number;
  flagged: boolean;
  free: number;
  frozen: number;
  price: number;
  balance: number;
  quotation: Quotation;
}
