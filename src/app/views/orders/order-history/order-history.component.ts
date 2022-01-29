import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpParams} from "@angular/common/http";
import {OrderService} from "../../../services/orders/order.service";
import {AssetService} from "../../../services/asset/asset.service";
import {SpinnerService} from "../../../shared/services/spinner.service";
import {AssetBalanceDto} from "../../../shared/dto/asset-balance-dto";
import {AssetBalance} from "../../../services/asset/models/asset-balance";
import {OrderDto} from "../../../shared/dto/order-dto";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

/*
[
  {
    "symbol": "LTCBTC",
    "orderId": 1,
    "orderListId": -1, //Unless OCO, the value will always be -1
    "clientOrderId": "myOrder1",
    "price": "0.1",
    "origQty": "1.0",
    "executedQty": "0.0",
    "cummulativeQuoteQty": "0.0",
    "status": "NEW",
    "timeInForce": "GTC",
    "type": "LIMIT",
    "side": "BUY",
    "stopPrice": "0.0",
    "icebergQty": "0.0",
    "time": 1499827319559,
    "updateTime": 1499827319559,
    "isWorking": true,
    "origQuoteOrderQty": "0.000000"
  }
]
*/

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  assetName: string;
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  assetChips: string[] = ['Lemon'];
  allAssetChips: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private spinnerService: SpinnerService
  ) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allAssetChips.slice())),
    );
  }

  ngOnInit(): void {
    this.listOrders();
  }

  listOrders() {
    console.log('OrderHistoryComponent::ngOnInit BEGIN')
    // this.spinnerService.setLoading(true);
    this.route.queryParams
      .subscribe(params => {
          this.assetName = params.assetName;
        }
      );
    const params = new HttpParams()
      .set("assetName", this.assetName)
      .set('page', 0)
      .set('size', 10);
    // this.orderService.listOrders(params)
    //   .subscribe((orders: OrderDto[]) => {
    //     if (orders) {
    //       console.log(orders);
    //     }
    //     this.spinnerService.setLoading(false);
    //   }, error => {
    //     console.log(error)
    //     this.spinnerService.setLoading(false);
    //   });
    console.log('OrderHistoryComponent::ngOnInit END')
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.assetChips.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);

    console.log("Add chip");
  }

  remove(fruit: string): void {
    const index = this.assetChips.indexOf(fruit);
    if (index >= 0) {
      this.assetChips.splice(index, 1);
    }
    console.log("Remove chip");
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.assetChips.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    console.log("Chip selected");
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allAssetChips.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
}
