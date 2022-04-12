import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Asset} from "../../shared/domain/asset";
import {SubscriptionService} from "../../services/subscription.service";
import {AssetService} from "../../services/asset.service";
import {HttpErrorResponse, HttpParams, HttpStatusCode} from "@angular/common/http";
import {AssetDto} from "../../shared/dto/asset-dto";
import {SubscriptionDto} from "../../shared/dto/subscription-dto";
import {RxStompService} from "@stomp/ng2-stompjs";
import {Message} from "@stomp/stompjs";
import {LoadingIndicatorService} from "../../services/loading-indicator.service";
import {OrderDto} from "../../shared/dto/order-dto";
import {OrderService} from "../../services/order.service";
import {Page} from "../../shared/paging/page";
import {SnackService} from "../../services/snack.service";
import {Router} from "@angular/router";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {ChipDto} from "../../shared/dto/chip-dto";
import {ChipsService} from "../../services/chips.service";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  chips: string[] = [];
  availableChips: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  chipsControl = new FormControl();
  filteredChips: Observable<string[]>;

  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatAutocompleteTrigger) matAutocomplete: MatAutocompleteTrigger;

  public assetBalances: Asset[] = [];
  public selectedIndex: number;
  public displayedColumns: string[] = ['name', 'priceChange', 'price', 'amount', 'total', 'action'];

  constructor(
    private router: Router,
    private chipService: ChipsService,
    private assetService: AssetService,
    private orderService: OrderService,
    private snackService: SnackService,
    private rxStompService: RxStompService,
    private subscriptionService: SubscriptionService,
    private loadingIndicatorService: LoadingIndicatorService,
  ) {
    //
  }

  private static toAssetBalance(source: AssetDto): Asset {
    const assetBalance: Asset = new Asset();
    assetBalance.asset = source.asset;
    assetBalance.fullName = source.fullName;
    assetBalance.free = source.free;
    assetBalance.frozen = source.frozen;
    assetBalance.price = source.price.toFixed(2);
    assetBalance.priceChange = source.priceChange.toFixed(2);
    assetBalance.balance = source.balance.toFixed(2);
    assetBalance.iconIndex = source.iconIndex;
    assetBalance.quotation = source.quotation;
    return assetBalance;
  }

  private static updateAssetBalance(source: AssetDto, target: Asset) {
    target.free = source.free;
    target.frozen = source.frozen;
    target.price = source.price.toFixed(2);
    target.priceChange = source.priceChange.toFixed(2);
    target.balance = source.balance.toFixed(2);
    target.quotation = source.quotation;
  }

  ngOnInit(): void {
    const params = new HttpParams()
    // .set('page', 0)
    // .set('size', this.pageSize);
    this.fetchAssetBalances(params);
    this.fetchAvailableAssets();
    this.fetchPersistentChips();
  }

  fetchAssets(): void {
    console.time("AssetsComponent::fetchAssets");
    this.loadingIndicatorService.setLoading(true);
    // this.assetService.listAssetBalances(httpParams)
    //   .subscribe((assetBalances: AssetBalanceDto[]) => {
    //     if (assetBalances) {
    //       this.assetBalances = assetBalances!.map(AssetsComponent.toAssetBalance)
    //       this.assetBalances.forEach((assetBalance: AssetBalance) => {
    //         if (!assetBalance.asset.includes("USDT")) {
    //           this.fetchOpenOrders(assetBalance);
    //           this.fetchSubscription(assetBalance);
    //         }
    //       });
    //     }
    //     this.loadingIndicatorService.setLoading(false);
    //   }, (httpErrorResponse: HttpErrorResponse) => {
    //     console.log(httpErrorResponse);
    //     this.snackService.error(httpErrorResponse.error.errors[0].description);
    //     this.loadingIndicatorService.setLoading(false);
    //   }, () => {
    //     console.timeEnd("AssetsComponent::fetchAssetBalances");
    //   })
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
          // this.chips.forEach((chip: string) => {
          //   this.fetchOrders(chip)
          // });
        }
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.snackService.error(httpErrorResponse.error.errors[0].description);
      }, () => {
        console.timeEnd('OrderHistoryComponent::fetchPersistentChips')
      });
  }

  fetchOpenOrders(assetBalance: Asset) {
    console.time("AssetsComponent::fetchOpenOrders");
    const params = new HttpParams()
    // .set('page', 0)
    // .set('size', this.pageSize);
    this.orderService.getOpenOrders(assetBalance.asset, params)
      .subscribe((page: Page<OrderDto[]>) => {
        assetBalance.openOrders = page.totalElements
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.snackService.error(httpErrorResponse.error.errors[0].description);
      }, () => {
        console.timeEnd("AssetsComponent::fetchOpenOrders");
      });

  }

  fetchSubscription(assetBalance: Asset) {
    console.time("AssetsComponent::fetchSubscription");
    const params = new HttpParams()
    // .set('page', 0)
    // .set('size', this.pageSize);
    this.subscriptionService.getSubscription(assetBalance.asset)
      .subscribe((subscriptionDto: SubscriptionDto) => {
        assetBalance.toggled = subscriptionDto !== null;
        if (assetBalance.toggled) {
          this.removeAssetTickerEvent(assetBalance);
          this.addAssetTickerEvent(assetBalance);
        }
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        assetBalance.toggled = httpErrorResponse.ok;
      }, () => {
        console.timeEnd("AssetsComponent::fetchSubscription");
      });
  }

  fetchAssetBalances(httpParams: HttpParams) {
    console.time("AssetsComponent::fetchAssetBalances");
    this.loadingIndicatorService.setLoading(true);
    this.assetService.listAssets(httpParams)
      .subscribe((assetBalances: AssetDto[]) => {
        if (assetBalances) {
          this.assetBalances = assetBalances!.map(AssetsComponent.toAssetBalance)
          this.assetBalances.forEach((assetBalance: Asset) => {
            if (!assetBalance.asset.includes("USDT")) {
              this.fetchOpenOrders(assetBalance);
              this.fetchSubscription(assetBalance);
            }
          });
        }
        this.loadingIndicatorService.setLoading(false);
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.snackService.error(httpErrorResponse.error.errors[0].description);
        this.loadingIndicatorService.setLoading(false);
      }, () => {
        console.timeEnd("AssetsComponent::fetchAssetBalances");
      })
  }

  toggleSubscription(assetBalance: Asset) {
    console.time("AssetsComponent::toggleSubscription");
    assetBalance.toggled = !assetBalance.toggled;
    if (assetBalance.toggled) {
      this.subscriptionService.addSubscription(assetBalance)
        .subscribe((subscription: SubscriptionDto) => {
          assetBalance.toggled = subscription !== null;
          if (assetBalance.toggled) {
            this.addAssetTickerEvent(assetBalance);
          }
        }, (httpErrorResponse: HttpErrorResponse) => {
          console.log(httpErrorResponse);
          this.snackService.error(httpErrorResponse.error.errors[0].description);
        }, () => {
          console.timeEnd("AssetsComponent::toggleSubscription");
        });
    } else {
      this.subscriptionService.removeSubscription(assetBalance.asset)
        .subscribe((response: Response) => {
          if (response) {
            assetBalance.toggled = !(response.status == HttpStatusCode.NoContent);
            this.removeAssetTickerEvent(assetBalance);
          }
        }, (httpErrorResponse: HttpErrorResponse) => {
          console.log(httpErrorResponse);
          this.snackService.error(httpErrorResponse.error.errors[0].description);
        }, () => {
          console.timeEnd("AssetsComponent::toggleSubscription");
        })
    }
  }

  addAssetTickerEvent(assetBalance: Asset) {
    console.time("AssetsComponent::registerAssetTickerEvent");
    const topic = `/topic/${assetBalance.asset}-ticker`;
    assetBalance.subscription = this.rxStompService
      .watch(topic)
      .subscribe((message: Message) => {
        if (message) {
          const assetBalanceDto: AssetDto = JSON.parse(message.body);
          AssetsComponent.updateAssetBalance(assetBalanceDto, assetBalance);
        }
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.snackService.error(httpErrorResponse.error.errors[0].description);
      }, () => {
        console.timeEnd("AssetsComponent::registerAssetTickerEvent");
      })
  }

  removeAssetTickerEvent(assetBalance: Asset) {
    console.time("AssetsComponent::removeAssetTickerEvent");
    if (assetBalance.subscription) {
      assetBalance.subscription.unsubscribe()
    }
    console.timeEnd("AssetsComponent::removeAssetTickerEvent");
  }

  onClickAssetBalance(assetName: string) {
    this.router.navigateByUrl("/trade?assetName=" + assetName);
  }


  addChip(event: MatChipInputEvent): void {
    console.log('OrderHistoryComponent::addChip')
    const symbol = (event.value || '').trim();
    if (symbol && this.availableChips.indexOf(symbol) >= 0) {
      this.chipService.addChip(new ChipDto(symbol))
        .subscribe((chip: ChipDto) => {
          this.chips.push(chip.name);
          // this.fetchOrders(chip.name);
        }, (httpErrorResponse: HttpErrorResponse) => {
          console.log(httpErrorResponse);
          this.snackService.error(httpErrorResponse.error.errors[0].description);
        });
    }
    event.chipInput!.clear();
    this.chipsControl.setValue(null);
    this.matAutocomplete.closePanel();
    console.log('OrderHistoryComponent::addChip')
  }

  removeChip(chip: string): void {
    console.log('OrderHistoryComponent::removeChip')
    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chipService.removeChip(chip)
        .subscribe(() => {
          this.chips.splice(index, 1);
          const symbolName = `${chip}USDT`;
          // this.orderElements = this.orderElements.filter(order => order.symbol !== symbolName);
          // this.table.renderRows();
        }, (httpErrorResponse: HttpErrorResponse) => {
          console.log(httpErrorResponse);
          this.snackService.error(httpErrorResponse.error.errors[0].description);
        });
    }
    console.log('OrderHistoryComponent::removeChip')
  }

  selectChip(event: MatAutocompleteSelectedEvent): void {
    console.log('OrderHistoryComponent::selectChip')
    this.chipInput.nativeElement.value = '';
    this.chipsControl.setValue(null);
    this.chipService.addChip(new ChipDto(event.option.viewValue))
      .subscribe((chip: ChipDto) => {
        this.chips.push(chip.name);
        // this.fetchOrders(chip.name);
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.snackService.error(httpErrorResponse.error.errors[0].description);
      });
    console.log('OrderHistoryComponent::selectChip')
  }

  filterChips(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.availableChips.filter(chip => chip.toLowerCase().includes(filterValue));
  }
}
