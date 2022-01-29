import { Component, OnInit } from '@angular/core';
import {AssetBalance} from "../../../services/asset/models/asset-balance";
import {Order} from "../../../shared/domain/order";
import {OrderConfirmComponent} from "../../../shared/dialogs/order-confirm-dialog/order-confirm.component";
import {OrderType} from "../../../shared/enums/order-type";
import {OrderSide} from "../../../shared/enums/order-side";
import {MatDialog} from "@angular/material/dialog";
import {TestOrderDto} from "../../../shared/dto/test-order-dto";
import {OrderService} from "../../../services/orders/order.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-create-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {
  price: number;
  amount: number;
  assetName: string;
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  readonly OrderType: typeof OrderType = OrderType;
  readonly OrderSide: typeof OrderSide = OrderSide;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private orderService: OrderService,
  ) { }

  private static toOrder(orderType: OrderType, orderSide: OrderSide, assetName: string): Order {
    const order: Order = new Order();
    order.orderType = orderType;
    order.orderSide = orderSide;
    order.assetName = assetName;
    return order;
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          this.assetName = params.assetName;
        }
      );
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  createOrder(assetBalance: AssetBalance, orderType: OrderType, orderSide: OrderSide) {
    this.orderService.createOrder(
      assetBalance.asset,
      new TestOrderDto(orderType, orderSide, this.amount, this.price)
    ).subscribe((orderDto: TestOrderDto) => {
      if (orderDto) {
        console.log(orderDto)
      }
    }, error => {
      console.log(error)
    });
  }

  openDialog(orderType: OrderType, orderSide: OrderSide, assetName: string): void {
    const order: Order = PlaceOrderComponent.toOrder(orderType, orderSide, assetName);
    const dialogRef = this.dialog.open(OrderConfirmComponent, {
      data: order,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
