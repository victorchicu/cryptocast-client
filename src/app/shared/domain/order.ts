import {OrderType} from "../enums/order-type";
import {OrderSide} from "../enums/order-side";
import {FundsBalance} from "../../services/funds/models/funds-balance";

export class Order {
  private _orderType: OrderType;
  private _orderSide: OrderSide;
  private _fundsName: string;

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

  get fundsName(): string {
    return this._fundsName;
  }

  set fundsName(value: string) {
    this._fundsName = value;
  }
}
