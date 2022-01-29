export class OrderDto {
  private symbol: string
  private orderId: number
  private orderListId: number;
  private clientOrderId: string;
  private price: number;
  private origQty: number;
  private cummulativeQuoteQty: number;
  private status: string;
  private timeInForce: string;
  private type: string;
  private side: string;
  private stopPrice: number;
  private icebergQty: number;
  private time: number;
  private updateTime: number;
  private isWorking: boolean;
  private origQuoteOrderQty: number;

  constructor(
    symbol: string,
    orderId: number,
    orderListId: number,
    clientOrderId: string,
    price: number,
    origQty: number,
    cummulativeQuoteQty: number,
    status: string,
    timeInForce: string,
    type: string,
    side: string,
    stopPrice: number,
    icebergQty: number,
    time: number,
    updateTime: number,
    isWorking: boolean,
    origQuoteOrderQty: number
  ) {
    this.symbol = symbol;
    this.orderId = orderId;
    this.orderListId = orderListId;
    this.clientOrderId = clientOrderId;
    this.price = price;
    this.origQty = origQty;
    this.cummulativeQuoteQty = cummulativeQuoteQty;
    this.status = status;
    this.timeInForce = timeInForce;
    this.type = type;
    this.side = side;
    this.stopPrice = stopPrice;
    this.icebergQty = icebergQty;
    this.time = time;
    this.updateTime = updateTime;
    this.isWorking = isWorking;
    this.origQuoteOrderQty = origQuoteOrderQty;
  }
}
