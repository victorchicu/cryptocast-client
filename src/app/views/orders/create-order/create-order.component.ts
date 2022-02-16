import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AssetBalance} from "../../../shared/domain/asset-balance";
import {Order} from "../../../shared/domain/order";
import {OrderConfirmComponent} from "../../../shared/dialogs/order-confirm-dialog/order-confirm.component";
import {OrderType} from "../../../shared/enums/order-type";
import {OrderSide} from "../../../shared/enums/order-side";
import {MatDialog} from "@angular/material/dialog";
import {TestOrderDto} from "../../../shared/dto/test-order-dto";
import {OrderService} from "../../../services/order.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {HttpParams} from "@angular/common/http";
import {ChipDto} from "../../../shared/dto/chip-dto";
import {AssetService} from "../../../services/asset.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {AssetBalanceDto} from "../../../shared/dto/asset-balance-dto";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateOrderComponent implements OnInit {
  price: number;
  amount: number;
  assetName: string;
  assetsControl = new FormControl();
  availableAssets: string[] = [];
  filteredAssets: Observable<string[]>;
  readonly OrderType: typeof OrderType = OrderType;
  readonly OrderSide: typeof OrderSide = OrderSide;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private assetService: AssetService,
    private orderService: OrderService,
  ) {
    //
  }

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
    this.fetchAvailableAssets();
  }

  createOrder(assetBalance: AssetBalance, orderType: OrderType, orderSide: OrderSide) {
    console.time("CreateOrderComponent::createOrder");
    this.orderService.createOrder(
      assetBalance.asset,
      new TestOrderDto(orderType, orderSide, this.amount, this.price)
    ).subscribe((orderDto: TestOrderDto) => {
      if (orderDto) {
        console.log(orderDto)
      }
    }, error => {
      console.log(error)
    }, () => {
      console.timeEnd("CreateOrderComponent::createOrder");
    });
  }

  openDialog(orderType: OrderType, orderSide: OrderSide, assetName: string): void {
    const order: Order = CreateOrderComponent.toOrder(orderType, orderSide, assetName);
    const dialogRef = this.dialog.open(OrderConfirmComponent, {
      data: order,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  selectAsset($event: MatAutocompleteSelectedEvent) {
    console.time('CreateOrderComponent::selectAsset')
    const assetName: string = $event.option.value;
    this.assetService.getAssetBalance(assetName)
      .subscribe((assetBalance: AssetBalanceDto) => {
        if (assetBalance) {
          console.log(assetBalance);
          this.amount = assetBalance.free;
        }
      }, error => {
        console.log(error)
      }, () => {
        console.timeEnd('CreateOrderComponent::selectAsset')
      });
  }

  fetchAvailableAssets() {
    console.time('CreateOrderComponent::fetchAvailableAssets')
    const params = new HttpParams()
      .set('page', 0)
      .set('size', 10);
    this.assetService.availableAssets(params)
      .subscribe((chips: ChipDto[]) => {
        if (chips) {
          this.availableAssets = chips!.map((chip: ChipDto) => chip.name)
          this.filteredAssets = this.assetsControl.valueChanges.pipe(
            startWith(null),
            map((chip: string | null) => (
              chip
                ? this._filter(chip)
                : this.availableAssets.slice()
            ))
          );
        }
      }, error => {
        console.log(error)
      }, () => {
        console.timeEnd('CreateOrderComponent::fetchAvailableAssets')
      });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.availableAssets.filter(option => option.toLowerCase().includes(filterValue));
  }
}
