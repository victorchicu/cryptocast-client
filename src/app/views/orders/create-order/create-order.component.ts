import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Order} from "../../../shared/domain/order";
import {ConfirmOrderComponent} from "../../dialogs/confirm-order/confirm-order.component";
import {OrderType} from "../../../shared/enums/order-type";
import {OrderSide} from "../../../shared/enums/order-side";
import {ActivatedRoute} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {HttpErrorResponse, HttpParams} from "@angular/common/http";
import {ChipDto} from "../../../shared/dto/chip-dto";
import {AssetService} from "../../../services/asset.service";
import {AssetDto} from "../../../shared/dto/asset-dto";
import {AssetPriceDto} from "../../../shared/dto/asset-price-dto";
import {SnackService} from "../../../services/snack.service";

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
    // private dialog: MatDialog,
    private assetService: AssetService,
    private snackService: SnackService
  ) {
    //
  }

  private static toTestOrder(side: OrderSide, type: OrderType, price: number, quantity: number): Order {
    const testOrder: Order = new Order();
    testOrder.side = side;
    testOrder.type = type;
    testOrder.price = price;
    testOrder.quantity = quantity;
    return testOrder;
  }

  ngOnInit(): void {
    this.fetchAvailableAssets();
  }

  openDialog(assetName: string, side: OrderSide, type: OrderType, price: number, amount: number): void {
    // const testOrder: Order = CreateOrderComponent.toTestOrder(side, type, price, amount);
    // const dialogRef = this.dialog.open(ConfirmOrderComponent, {
    //   data: {
    //     title: "Confirm Order",
    //     subject: `Are you sure you want to create ${testOrder.side} order by ${testOrder.type}?`,
    //     assetName: assetName,
    //     testOrder: testOrder,
    //   }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result);
    // });
  }

  selectAsset(/* $event: MatAutocompleteSelectedEvent */) {
    // this.assetName = $event.option.value;
    // this.assetService.getAssetPrice(this.assetName)
    //   .subscribe((assetPriceDto: AssetPriceDto) => {
    //     if (assetPriceDto) {
    //       this.price = assetPriceDto.price;
    //     }
    //   }, (httpErrorResponse: HttpErrorResponse) => {
    //     console.log(httpErrorResponse);
    //     this.snackService.error(httpErrorResponse.error.errors[0].description);
    //   }, () => {
    //     console.log('AssetService::getAssetPrice COMPLETED')
    //   });
    // this.assetService.getAsset(this.assetName)
    //   .subscribe((assetBalance: AssetDto) => {
    //     if (assetBalance) {
    //       this.quantity = assetBalance.free;
    //     }
    //   }, (httpErrorResponse: HttpErrorResponse) => {
    //     console.log(httpErrorResponse);
    //     this.snackService.error(httpErrorResponse.error.errors[0].description);
    //   }, () => {
    //     console.log('AssetService::getAssetBalance COMPLETED')
    //   });
  }

  onTabChanged(/* $event: MatTabChangeEvent */) {
    // this.price = 0;
    // this.amount = 0;
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
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.snackService.error(httpErrorResponse.error.errors[0].description);
      }, () => {
        console.timeEnd('CreateOrderComponent::fetchAvailableAssets')
      });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.availableAssets.filter(option => option.toLowerCase().includes(filterValue));
  }
}
