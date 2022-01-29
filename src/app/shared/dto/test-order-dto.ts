import {OrderType} from "../enums/order-type";
import {OrderSide} from "../enums/order-side";

export class TestOrderDto {
  private orderType: OrderType
  private orderSide: OrderSide
  private orderQty: number
  private orderPrice: number

  constructor(orderType: OrderType, orderSide: OrderSide, orderQty: number, orderPrice: number) {
    this.orderType = orderType;
    this.orderSide = orderSide;
    this.orderQty = orderQty;
    this.orderPrice = orderPrice;
  }
}
