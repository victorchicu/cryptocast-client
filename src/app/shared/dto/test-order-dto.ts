import {OrderType} from "../enums/order-type";
import {OrderSide} from "../enums/order-side";

export class TestOrderDto {
  private asset: string
  private side: OrderSide
  private type: OrderType
  private price: number
  private quantity: number

  constructor(asset: string, side: OrderSide, type: OrderType, price: number, quantity: number) {
    this.asset = asset;
    this.side = side;
    this.type = type;
    this.price = price;
    this.quantity = quantity;
  }
}
