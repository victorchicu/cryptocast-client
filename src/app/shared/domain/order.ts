import {OrderType} from "../enums/order-type";
import {OrderSide} from "../enums/order-side";

export class Order {
  private _side: OrderSide;
  private _type: OrderType;
  private _price: number;
  private _quantity: number;

  get side(): OrderSide {
    return this._side;
  }

  set side(value: OrderSide) {
    this._side = value;
  }

  get type(): OrderType {
    return this._type;
  }

  set type(value: OrderType) {
    this._type = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }
}
