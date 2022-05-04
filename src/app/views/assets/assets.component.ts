import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Asset} from "../../shared/domain/asset";
import {AssetTrackerService} from "../../services/asset-tracker.service";
import {AssetService} from "../../services/asset.service";
import {HttpErrorResponse, HttpParams, HttpStatusCode} from "@angular/common/http";
import {AssetDto} from "../../shared/dto/asset-dto";
import {TrackingDto} from "../../shared/dto/tracking-dto";
import {RxStompService} from "@stomp/ng2-stompjs";
import {Message} from "@stomp/stompjs";
import {LoadingIndicatorService} from "../../services/loading-indicator.service";
import {OrderDto} from "../../shared/dto/order-dto";
import {OrderService} from "../../services/order.service";
import {Page} from "../../shared/paging/page";
import {SnackService} from "../../services/snack.service";
import {Router} from "@angular/router";
import {ChipDto} from "../../shared/dto/chip-dto";
import {ChipsService} from "../../services/chips.service";
@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  selectedChips: ChipDto[] = [];
  filteredChips: any[] = [];
  availableChips: ChipDto[] = [];

  selectedAsset: Asset;
  public assets: Asset[] = [];

  constructor(
    private router: Router,
    private chipService: ChipsService,
    private assetService: AssetService,
    private orderService: OrderService,
    private snackService: SnackService,
    private rxStompService: RxStompService,
    private subscriptionService: AssetTrackerService,
    private loadingIndicatorService: LoadingIndicatorService,
  ) {
    //
  }

  private static toAsset(source: AssetDto): Asset {
    const asset: Asset = new Asset();
    asset.name = source.name;
    asset.fullName = source.fullName;
    asset.free = source.free;
    asset.frozen = source.frozen;
    asset.price = source.price.toFixed(4);
    asset.priceChange = source.priceChange.toFixed(4);
    asset.balance = source.balance.toFixed(4);
    asset.iconIndex = source.iconIndex;
    asset.quotation = source.quotation;
    asset.toggled = false;
    asset.openOrders = 0;
    return asset;
  }

  private static updateAsset(source: AssetDto, target: Asset) {
    target.free = source.free;
    target.frozen = source.frozen;
    target.price = source.price.toFixed(4);
    target.priceChange = source.priceChange.toFixed(4);
    target.balance = source.balance.toFixed(4);
    if (source.balance > 0) {
      target.quotation = source.quotation;
    }
  }

  ngOnInit(): void {
    this.fetchAvailableAssets();
    this.fetchPersistentChips();
  }

  addChip(/*event: MatChipInputEvent */): void {
    // console.log('AssetsComponent::addChip')
    // const symbol = (event.value || '').trim();
    // if (symbol && this.availableChips.indexOf(symbol) >= 0) {
    //   this.chipService.addChip(new ChipDto(symbol))
    //     .subscribe((chip: ChipDto) => {
    //       this.chips.push(chip.name);
    //       this.fetchAssetByName(chip.name);
    //     }, (httpErrorResponse: HttpErrorResponse) => {
    //       console.log(httpErrorResponse);
    //       this.snackService.error(httpErrorResponse.error.errors[0].description);
    //     });
    // }
    // event.chipInput!.clear();
    // this.chipsControl.setValue(null);
    // this.matAutocomplete.closePanel();
    // console.log('AssetsComponent::addChip')
  }

  removeChip(chip: string): void {
    // console.log('AssetsComponent::removeChip')
    // const index = this.chips.indexOf(chip);
    // if (index >= 0) {
    //   this.chipService.removeChip(chip)
    //     .subscribe(() => {
    //       this.chips.splice(index, 1);
    //       this.assets = this.assets.filter(asset => asset.name !== chip);
    //       this.table.renderRows();
    //     }, (httpErrorResponse: HttpErrorResponse) => {
    //       console.log(httpErrorResponse);
    //       this.snackService.error(httpErrorResponse.error.errors[0].description);
    //     });
    // }
    // console.log('AssetsComponent::removeChip')
  }

  selectChip(/* event: MatAutocompleteSelectedEvent */): void {
    // console.time("AssetsComponent::selectChip");
    // this.chipInput.nativeElement.value = '';
    // this.chipsControl.setValue(null);
    // this.chipService.addChip(new ChipDto(event.option.viewValue))
    //   .subscribe((chip: ChipDto) => {
    //     this.chips.push(chip.name);
    //     this.fetchAssetByName(chip.name);
    //   }, (httpErrorResponse: HttpErrorResponse) => {
    //     console.log(httpErrorResponse);
    //     this.snackService.error(httpErrorResponse.error.errors[0].description);
    //   }, () => {
    //     console.timeEnd('AssetsComponent::selectChip')
    //   });
  }

  filterChips(value: any) {
    let query = value.query;
    let filtered: any[] = [];
    for (let i = 0; i < this.availableChips.length; i++) {
      let selectedChip = this.availableChips[i];
      if (selectedChip.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(selectedChip);
      }
    }
    this.filteredChips = filtered;
  }

  onClickAsset(assetName: string) {
    this.router.navigateByUrl("/trade?assetName=" + assetName);
  }

  fetchAssets(httpParams: HttpParams) {
    console.time("AssetsComponent::fetchAssets");
    this.loadingIndicatorService.setLoading(true);
    this.assetService.listAssets(httpParams)
      .subscribe((assets: AssetDto[]) => {
        if (assets) {
          this.assets = assets!.map(AssetsComponent.toAsset)
          this.assets.forEach((asset: Asset) => {
            if (!asset.name.includes("USDT")) {
              this.fetchOpenOrders(asset);
              this.fetchSubscription(asset);
            }
          });
        }
        this.loadingIndicatorService.setLoading(false);
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.snackService.error(httpErrorResponse.error.errors[0].description);
        this.loadingIndicatorService.setLoading(false);
      }, () => {
        console.timeEnd("AssetsComponent::fetchAssets");
      })
  }

  fetchOpenOrders(asset: Asset) {
    console.time("AssetsComponent::fetchOpenOrders");
    const params = new HttpParams()
    // .set('page', 0)
    // .set('size', this.pageSize);
    this.orderService.getOpenOrders(asset.name, params)
      .subscribe((page: Page<OrderDto[]>) => {
        asset.openOrders = page.totalElements
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.snackService.error(httpErrorResponse.error.errors[0].description);
      }, () => {
        console.timeEnd("AssetsComponent::fetchOpenOrders");
      });
  }

  fetchSubscription(asset: Asset) {
    console.time("AssetsComponent::fetchSubscription");
    this.subscriptionService.getAssetTracker(asset.name)
      .subscribe((subscriptionDto: TrackingDto) => {
        console.log(subscriptionDto);
        asset.toggled = subscriptionDto !== null;
        if (asset.toggled) {
          this.removeAssetTickerEvent(asset);
          this.addAssetTickerEvent(asset);
        }
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        asset.toggled = httpErrorResponse.ok;
      }, () => {
        console.timeEnd("AssetsComponent::fetchSubscription");
      });
  }

  fetchAvailableAssets() {
    console.time('AssetsComponent::fetchAvailableAssets')
    const params = new HttpParams()
      .set('page', 0)
      .set('size', 10);
    this.assetService.availableAssets(params)
      .subscribe((chips: ChipDto[]) => {
        if (chips) {
          this.availableChips = chips; //!.map((chip: ChipDto) => chip.name)
        }
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.snackService.error(httpErrorResponse.error.errors[0].description);
      }, () => [
        console.timeEnd('AssetsComponent::fetchAvailableAssets')
      ]);
  }

  fetchPersistentChips() {
    console.time('AssetsComponent::fetchPersistentChips')
    const chipsParams = new HttpParams()
      .set('page', 0)
      .set('size', 10);
    this.chipService.listChips(chipsParams)
      .subscribe((chips: ChipDto[]) => {
        if (chips) {
          this.selectedChips = chips;
          console.log(this.selectedChips);
          const assetParams = new HttpParams()
            .set('assets', this.selectedChips.map(value => value.name).join(","))
          this.fetchAssets(assetParams);
        }
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.snackService.error(httpErrorResponse.error.errors[0].description);
      }, () => {
        console.timeEnd('AssetsComponent::fetchPersistentChips')
      });
  }

  toggleSubscription(asset: Asset) {
    console.time("AssetsComponent::toggleSubscription");
    asset.toggled = !asset.toggled;
    if (asset.toggled) {
      this.subscriptionService.addAssetTracker(asset)
        .subscribe((subscription: TrackingDto) => {
          asset.toggled = subscription !== null;
          if (asset.toggled) {
            this.addAssetTickerEvent(asset);
          }
        }, (httpErrorResponse: HttpErrorResponse) => {
          console.log(httpErrorResponse);
          this.snackService.error(httpErrorResponse.error.errors[0].description);
        }, () => {
          console.timeEnd("AssetsComponent::toggleSubscription");
        });
    } else {
      this.subscriptionService.removeAssetTracker(asset.name)
        .subscribe((response: Response) => {
          if (response) {
            asset.toggled = !(response.status == HttpStatusCode.NoContent);
            this.removeAssetTickerEvent(asset);
          }
        }, (httpErrorResponse: HttpErrorResponse) => {
          console.log(httpErrorResponse);
          this.snackService.error(httpErrorResponse.error.errors[0].description);
        }, () => {
          console.timeEnd("AssetsComponent::toggleSubscription");
        })
    }
  }

  addAssetTickerEvent(asset: Asset) {
    console.time("AssetsComponent::addAssetTickerEvent");
    const topic = `/topic/${asset.name}-ticker`;
    asset.subscription = this.rxStompService
      .watch(topic)
      .subscribe((message: Message) => {
        if (message) {
          const assetDto: AssetDto = JSON.parse(message.body);
          AssetsComponent.updateAsset(assetDto, asset);
        }
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.snackService.error(httpErrorResponse.error.errors[0].description);
      }, () => {
        console.timeEnd("AssetsComponent::addAssetTickerEvent");
      })
  }

  removeAssetTickerEvent(asset: Asset) {
    console.time("AssetsComponent::removeAssetTickerEvent");
    if (asset.subscription) {
      asset.subscription.unsubscribe()
    }
    console.timeEnd("AssetsComponent::removeAssetTickerEvent");
  }


  private fetchAssetByName(assetName: string) {
    // console.time("AssetsComponent::fetchAssetByName");
    // this.assetService.getAsset(assetName)
    //   .subscribe((assetDto: AssetDto) => {
    //     const asset: Asset = AssetsComponent.toAsset(assetDto);
    //     console.log(asset);
    //     if (!asset.name.includes("USDT")) {
    //       this.fetchOpenOrders(asset);
    //       this.fetchSubscription(asset);
    //     }
    //     this.assets.push(AssetsComponent.toAsset(assetDto))
    //     this.table.renderRows();
    //   }, (httpErrorResponse: HttpErrorResponse) => {
    //     console.log(httpErrorResponse);
    //     this.snackService.error(httpErrorResponse.error.errors[0].description);
    //   }, () => {
    //     console.timeEnd("AssetsComponent::fetchAssetByName");
    //   })
  }
}
