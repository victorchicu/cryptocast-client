import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse, HttpParams} from "@angular/common/http";
import {OrderService} from "../../../services/order.service";
import {OrderDto} from "../../../shared/dto/order-dto";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {ChipsService} from "../../../services/chips.service";
import {ChipDto} from "../../../shared/dto/chip-dto";
import {Page} from "../../../shared/paging/page";
import {AssetService} from "../../../services/asset.service";
import {OrderComponent, OrderElement} from "../order-component";
import {SnackService} from "../../../services/snack.service";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent extends OrderComponent {

  chips: string[] = [];
  availableChips: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  chipsControl = new FormControl();
  filteredChips: Observable<string[]>;

  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;
  // @ViewChild(MatAutocompleteTrigger) matAutocomplete: MatAutocompleteTrigger;

  constructor(
    private route: ActivatedRoute,
    private chipService: ChipsService,
    private orderService: OrderService,
    private assetService: AssetService,
    private snackService: SnackService
  ) {
    super();
  }

  ngOnInit() {
    this.fetchAvailableAssets();
    this.fetchPersistentChips();
  }

  addChip(/* event: MatChipInputEvent */): void {
    // console.log('OrderHistoryComponent::addChip')
    // const symbol = (event.value || '').trim();
    // if (symbol && this.availableChips.indexOf(symbol) >= 0) {
    //   this.chipService.addChip(new ChipDto(symbol))
    //     .subscribe((chip: ChipDto) => {
    //       this.chips.push(chip.name);
    //       this.fetchOrders(chip.name);
    //     }, (httpErrorResponse: HttpErrorResponse) => {
    //       console.log(httpErrorResponse);
    //       this.snackService.error(httpErrorResponse.error.errors[0].description);
    //     });
    // }
    // event.chipInput!.clear();
    // this.chipsControl.setValue(null);
    // this.matAutocomplete.closePanel();
    // console.log('OrderHistoryComponent::addChip')
  }

  removeChip(chip: string): void {
    console.log('OrderHistoryComponent::removeChip')
    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chipService.removeChip(chip)
        .subscribe(() => {
          this.chips.splice(index, 1);
          const symbolName = `${chip}USDT`;
          this.orderElements = this.orderElements.filter(order => order.symbol !== symbolName);
          // this.table.renderRows();
        }, (httpErrorResponse: HttpErrorResponse) => {
          console.log(httpErrorResponse);
          this.snackService.error(httpErrorResponse.error.errors[0].description);
        });
    }
    console.log('OrderHistoryComponent::removeChip')
  }

  selectChip(/* event: MatAutocompleteSelectedEvent */): void {
    // console.log('OrderHistoryComponent::selectChip')
    // this.chipInput.nativeElement.value = '';
    // this.chipsControl.setValue(null);
    // this.chipService.addChip(new ChipDto(event.option.viewValue))
    //   .subscribe((chip: ChipDto) => {
    //     this.chips.push(chip.name);
    //     this.fetchOrders(chip.name);
    //   }, (httpErrorResponse: HttpErrorResponse) => {
    //     console.log(httpErrorResponse);
    //     this.snackService.error(httpErrorResponse.error.errors[0].description);
    //   });
    // console.log('OrderHistoryComponent::selectChip')
  }

  fetchOrders(assetName: string) {
    console.time('OrderHistoryComponent::fetchOrders')
    const params = new HttpParams()
      .set('page', 0)
      .set('size', 10);
    this.orderService.getAllOrders(assetName, params)
      .subscribe((page: Page<OrderDto[]>) => {
        console.log(page)
        if (page && page.content) {
          const orders: OrderDto[] = page.content;
          orders!.forEach((orderDto: OrderDto) => {
            this.orderElements.unshift(OrderHistoryComponent.toOrderElement(orderDto))
          })
          if (orders.length > 0) {
            // this.table.renderRows();
          }
        }
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.snackService.error(httpErrorResponse.error.errors[0].description);
      }, () => {
        console.timeEnd('OrderHistoryComponent::fetchOrders')
      });
  }

  fetchAvailableAssets() {
    console.time('OrderHistoryComponent::fetchAvailableAssets')
    const params = new HttpParams()
      .set('page', 0)
      .set('size', 10);
    this.assetService.availableAssets(params)
      .subscribe((chips: ChipDto[]) => {
        if (chips) {
          this.availableChips = chips!.map((chip: ChipDto) => chip.name)
          this.filteredChips = this.chipsControl.valueChanges.pipe(
            startWith(null),
            map((chip: string | null) => (
              chip
                ? this.filterChips(chip)
                : this.availableChips.slice()
            ))
          );
        }
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.snackService.error(httpErrorResponse.error.errors[0].description);
      }, () => [
        console.timeEnd('OrderHistoryComponent::fetchAvailableAssets')
      ]);
  }

  fetchPersistentChips() {
    console.time('OrderHistoryComponent::fetchPersistentChips')
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
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.snackService.error(httpErrorResponse.error.errors[0].description);
      }, () => {
        console.timeEnd('OrderHistoryComponent::fetchPersistentChips')
      });
  }

  private filterChips(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.availableChips.filter(chip => chip.toLowerCase().includes(filterValue));
  }
}
