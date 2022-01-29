import {OrderType} from "../enums/order-type";
import {OrderSide} from "../enums/order-side";
import {AssetBalance} from "../../services/asset/models/asset-balance";

export class Order {
  private _orderType: OrderType;
  private _orderSide: OrderSide;
  private _assetName: string;

  get orderType(): OrderType {
    return this._orderType;
  }

  set orderType(value: OrderType) {
    this._orderType = value;
  }

  get orderSide(): OrderSide {
    return this._orderSide;
  }

  set orderSide(value: OrderSide) {
    this._orderSide = value;
  }

  get assetName(): string {
    return this._assetName;
  }

  set assetName(value: string) {
    this._assetName = value;
  }
}
