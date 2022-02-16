import {Component, OnInit, ViewChild} from "@angular/core";
import {OrderDto} from "../../shared/dto/order-dto";
import {MatTable} from "@angular/material/table";
import {HttpParams} from "@angular/common/http";
import {ChipDto} from "../../shared/dto/chip-dto";
import {map, startWith} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {ChipsService} from "../../services/chips.service";
import {OrderService} from "../../services/order.service";
import {AssetService} from "../../services/asset.service";

export class OrderElement {
  symbol: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
  stopPrice: string;
  icebergQty: string;
  time: number;
  updateTime: number;
  isWorking: boolean;
  origQuoteOrderQty: number;
}

// export interface OrderSupplier {
//   (): Page<OrderDto[]>;
// }

@Component({
  template: ''
})
export abstract class OrderComponent implements OnInit {

  @ViewChild(MatTable) public table: MatTable<OrderElement>;

  public orderElements: OrderElement[] = [];
  public displayedColumns: string[] = [
    'symbol',
    'orderId',
    // 'orderListId',
    // 'clientOrderId',
    'price',
    'origQty',
    'executedQty',
    'cummulativeQuoteQty',
    'status',
    'timeInForce',
    'type',
    'side',
    // 'stopPrice',
    // 'icebergQty',
    'time',
    // 'updateTime',
    // 'isWorking',
    'origQuoteOrderQty'
  ];

  public static toOrderElement(orderDto: OrderDto): OrderElement {
    const orderElement: OrderElement = new OrderElement();
    orderElement.symbol = orderDto.symbol;
    orderElement.orderId = orderDto.orderId;
    orderElement.orderListId = orderDto.orderListId;
    orderElement.clientOrderId = orderDto.clientOrderId;
    orderElement.price = orderDto.price.toString();
    orderElement.origQty = orderDto.origQty.toString();
    orderElement.executedQty = orderDto.executedQty.toString();
    orderElement.cummulativeQuoteQty = orderDto.cummulativeQuoteQty.toString();
    orderElement.status = orderDto.status;
    orderElement.timeInForce = orderDto.timeInForce;
    orderElement.type = orderDto.type;
    orderElement.side = orderDto.side;
    orderElement.stopPrice = orderDto.stopPrice.toString();
    orderElement.icebergQty = orderDto.icebergQty.toString();
    orderElement.time = orderDto.time
    orderElement.updateTime = orderDto.updateTime;
    orderElement.isWorking = orderDto.isWorking;
    orderElement.origQuoteOrderQty = orderDto.origQuoteOrderQty;
    return orderElement;
  }

  ngOnInit(): void {
    //
  }
}
