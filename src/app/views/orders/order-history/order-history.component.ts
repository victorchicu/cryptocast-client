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
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {ChipService} from "../../../services/chips/chip-service";
import {ChipDto} from "../../../shared/dto/chip-dto";

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

  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  chipsControl = new FormControl();
  filteredChips: Observable<string[]>;
  chips: string[] = [];
  availableChips: string[] = [];

  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatAutocompleteTrigger) matAutocomplete: MatAutocompleteTrigger;

  constructor(
    private route: ActivatedRoute,
    private chipService: ChipService,
    private orderService: OrderService,
    private spinnerService: SpinnerService
  ) {
    //
  }

  ngOnInit(): void {
    this.listChips();
    this.listAvailableChips();
  }

  listChips() {
    console.log('OrderHistoryComponent::listChips BEGIN')
    const params = new HttpParams()
      // .set('page', 0)
      // .set('size', 10);
    this.chipService.listChips(params)
      .subscribe((chips: ChipDto[]) => {
        if (chips) {
          this.chips = chips.map(value => value.name);
          this.chips.forEach((chip: string) => {
            this.listOrders(chip)
          });
        }
      }, error => {
        console.log(error)
      });
    console.log('OrderHistoryComponent::listChips END')
  }

  listOrders(assetName: string) {
    console.log('OrderHistoryComponent::ngOnInit BEGIN')
    const params = new HttpParams()
      .set("assetName", assetName)
      .set('page', 0)
      .set('size', 10);
    this.orderService.listOrders(params)
      .subscribe((orders: OrderDto[]) => {
        if (orders) {
          console.log(orders);
        }
      }, error => {
        console.log(error)
      });
    console.log('OrderHistoryComponent::ngOnInit END')
  }

  listAvailableChips() {
    console.log('OrderHistoryComponent::availableChips BEGIN')
    const params = new HttpParams()
      // .set('page', 0)
      // .set('size', 10);
    this.chipService.availableChips(params)
      .subscribe((chips: ChipDto[]) => {
        if (chips) {
          this.availableChips = chips!.map((chip: ChipDto) => chip.name)
          this.filteredChips = this.chipsControl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) => (fruit ? this._filter(fruit) : this.availableChips.slice())),
          );
        }
      }, error => {
        console.log(error)
      });
    console.log('OrderHistoryComponent::availableChips END')
  }

  addChip(event: MatChipInputEvent): void {
    console.log('OrderHistoryComponent::addChip BEGIN')
    const symbol = (event.value || '').trim();
    if (symbol && this.availableChips.indexOf(symbol) >= 0) {
      this.chipService.addChip(new ChipDto(symbol))
        .subscribe((chip: ChipDto) => {
          this.chips.push(chip.name);
        });
    }
    event.chipInput!.clear();
    this.chipsControl.setValue(null);
    this.matAutocomplete.closePanel();
    console.log('OrderHistoryComponent::addChip END')
  }

  removeChip(chip: string): void {
    console.log('OrderHistoryComponent::removeChip BEGIN')
    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chipService.removeChip(chip)
        .subscribe((value: void) => {
          this.chips.splice(index, 1);
        });
    }
    console.log('OrderHistoryComponent::removeChip END')
  }

  selectChip(event: MatAutocompleteSelectedEvent): void {
    console.log('OrderHistoryComponent::selectChip BEGIN')
    this.chipInput.nativeElement.value = '';
    this.chipsControl.setValue(null);
    this.chipService.addChip(new ChipDto(event.option.viewValue))
      .subscribe((chip: ChipDto) => {
        this.chips.push(chip.name);
      });
    console.log('OrderHistoryComponent::selectChip END')
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.availableChips.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
}
