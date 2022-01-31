export class OrderDto {
  symbol: string
  orderId: number
  orderListId: number;
  clientOrderId: string;
  price: number;
  origQty: number;
  cummulativeQuoteQty: number;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
  stopPrice: number;
  icebergQty: number;
  executedQty: number;
  time: number;
  updateTime: number;
  isWorking: boolean;
  origQuoteOrderQty: number;

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
