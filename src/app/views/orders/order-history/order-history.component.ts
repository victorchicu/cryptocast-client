import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpParams} from "@angular/common/http";
import {OrderService} from "../../../services/order.service";
import {SpinnerService} from "../../../shared/services/spinner.service";
import {OrderDto} from "../../../shared/dto/order-dto";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {ChipsService} from "../../../services/chips.service";
import {ChipDto} from "../../../shared/dto/chip-dto";
import {Page} from "../../../shared/paging/page";
import {MatTable} from "@angular/material/table";
import {FundsService} from "../../../services/funds.service";

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

const ORDER_DATA: OrderElement[] = [
  {
    symbol: '',
    orderId: 0,
    orderListId: 0,
    clientOrderId: 'H',
    price: '',
    origQty: '',
    executedQty: '',
    cummulativeQuoteQty: '',
    status: '',
    timeInForce: '',
    type: '',
    side: '',
    stopPrice: '',
    icebergQty: '',
    time: 0,
    updateTime: 0,
    isWorking: true,
    origQuoteOrderQty: 0
  }
];

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  chips: string[] = [];
  availableChips: string[] = [];
  orderElements: OrderElement[] = [];
  displayedColumns: string[] = [
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
  separatorKeysCodes: number[] = [ENTER, COMMA];
  chipsControl = new FormControl();
  filteredChips: Observable<string[]>;

  @ViewChild(MatTable) table: MatTable<OrderElement>;
  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatAutocompleteTrigger) matAutocomplete: MatAutocompleteTrigger;

  constructor(
    private route: ActivatedRoute,
    private chipService: ChipsService,
    private orderService: OrderService,
    private assetService: FundsService
  ) {
    //
  }

  ngOnInit(): void {
    this.fetchPersistentChips();
    this.fetchAvailableAssets();
  }

  addChip(event: MatChipInputEvent): void {
    console.log('OrderHistoryComponent::addChip BEGIN')
    const symbol = (event.value || '').trim();
    if (symbol && this.availableChips.indexOf(symbol) >= 0) {
      this.chipService.addChip(new ChipDto(symbol))
        .subscribe((chip: ChipDto) => {
          this.chips.push(chip.name);
          this.fetchOrders(chip.name);
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
          const symbolName = `${chip}USDT`;
          this.orderElements = this.orderElements.filter(order => order.symbol !== symbolName);
          this.table.renderRows();
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
        this.fetchOrders(chip.name);
      });
    console.log('OrderHistoryComponent::selectChip END')
  }

  fetchOrders(fundsName: string) {
    console.log('OrderHistoryComponent::ngOnInit BEGIN')
    const params = new HttpParams()
      .set('page', 0)
      .set('size', 10);
    this.orderService.getAllOrders(fundsName, params)
      .subscribe((page: Page<OrderDto[]>) => {
        console.log(page)
        if (page && page.content) {
          const orders: OrderDto[] = page.content;
          orders!.forEach((orderDto: OrderDto) => {
            this.orderElements.unshift(this.toOrderElement(orderDto))
          })
          if (orders.length > 0) {
            this.table.renderRows();
          }
        }
      }, error => {
        console.log(error)
      });
    console.log('OrderHistoryComponent::ngOnInit END')
  }

  fetchPersistentChips() {
    console.log('OrderHistoryComponent::fetchAppendedChips BEGIN')
    const params = new HttpParams()
    .set('page', 0)
    .set('size', 10);
    this.chipService.listChips(params)
      .subscribe((chips: ChipDto[]) => {
        if (chips) {
          this.chips = chips.map(value => value.name);
          this.chips.forEach((chip: string) => {
            this.fetchOrders(chip)
          });
        }
      }, error => {
        console.log(error);
      });
    console.log('OrderHistoryComponent::fetchAppendedChips END')
  }

  fetchAvailableAssets() {
    console.log('OrderHistoryComponent::fetchAvailableChips BEGIN')
    const params = new HttpParams()
      .set('page', 0)
      .set('size', 10);
    this.assetService.availableFunds(params)
      .subscribe((chips: ChipDto[]) => {
        if (chips) {
          this.availableChips = chips!.map((chip: ChipDto) => chip.name)
          this.filteredChips = this.chipsControl.valueChanges.pipe(
            startWith(null),
            map((chip: string | null) => (chip ? this._filter(chip) : this.availableChips.slice())),
          );
        }
      }, error => {
        console.log(error)
      });
    console.log('OrderHistoryComponent::fetchAvailableChips END')
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.availableChips.filter(chip => chip.toLowerCase().includes(filterValue));
  }

  private toOrderElement(orderDto: OrderDto): OrderElement {
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
}
