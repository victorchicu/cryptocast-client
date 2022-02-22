import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AssetBalance} from "../../../shared/domain/asset-balance";
import {TestOrder} from "../../../shared/domain/test-order";
import {ConfirmOrderComponent} from "../../dialogs/confirm-order/confirm-order.component";
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
import {AssetPriceDto} from "../../../shared/dto/asset-price-dto";
import { MatTabChangeEvent } from '@angular/material/tabs';
import {ScrollStrategyOptions} from "@angular/cdk/overlay";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateOrderComponent implements OnInit {
  price: number;
  quantity: number;
  assetName: string;
  assetsControl = new FormControl();
  availableAssets: string[] = [];
  filteredAssets: Observable<string[]>;
  readonly OrderSide: typeof OrderSide = OrderSide;
  readonly OrderType: typeof OrderType = OrderType;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private assetService: AssetService,
    private orderService: OrderService,
  ) {
    //
  }

  private static toTestOrder(side: OrderSide, type: OrderType, price: number, quantity: number): TestOrder {
    const testOrder: TestOrder = new TestOrder();
    testOrder.side = side;
    testOrder.type = type;
    testOrder.price = price;
    testOrder.quantity = quantity;
    return testOrder;
  }

  ngOnInit(): void {
    // this.route.queryParams
    //   .subscribe(params => {
    //       this.assetName = params.assetName;
    //     }
    //   );
    this.fetchAvailableAssets();
  }

  onTabChanged($event: MatTabChangeEvent) {
    // this.price = 0;
    // this.amount = 0;
  }

  openDialog(assetName: string, side: OrderSide, type: OrderType, price: number, amount: number): void {
    const testOrder: TestOrder = CreateOrderComponent.toTestOrder(side, type, price, amount);
    const dialogRef = this.dialog.open(ConfirmOrderComponent, {
      data: {
        title: "Confirm Order",
        subject: `Are you sure you want to create ${testOrder.side} order by ${testOrder.type}?`,
        assetName: assetName,
        testOrder: testOrder,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  selectAsset($event: MatAutocompleteSelectedEvent) {
    this.assetName = $event.option.value;
    this.assetService.getAssetPrice(this.assetName)
      .subscribe((assetPriceDto: AssetPriceDto) => {
        if (assetPriceDto) {
          this.price = assetPriceDto.price;
        }
      }, error => {
        console.log(error)
      }, () => {
        console.log('AssetService::getAssetPrice COMPLETED')
      });
    this.assetService.getAssetBalance(this.assetName)
      .subscribe((assetBalance: AssetBalanceDto) => {
        if (assetBalance) {
          this.quantity = assetBalance.free;
        }
      }, error => {
        console.log(error)
      }, () => {
        console.log('AssetService::getAssetBalance COMPLETED')
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
