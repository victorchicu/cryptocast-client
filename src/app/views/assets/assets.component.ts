import {Component, OnInit, ViewChild} from '@angular/core';
import {AssetBalance} from "../../shared/domain/asset-balance";
import {SubscriptionService} from "../../services/subscription.service";
import {AssetService} from "../../services/asset.service";
import {HttpErrorResponse, HttpParams, HttpStatusCode} from "@angular/common/http";
import {AssetBalanceDto} from "../../shared/dto/asset-balance-dto";
import {SubscriptionDto} from "../../shared/dto/subscription-dto";
import {RxStompService} from "@stomp/ng2-stompjs";
import {Message} from "@stomp/stompjs";
import {LoadingIndicatorService} from "../../services/loading-indicator.service";
import {OrderDto} from "../../shared/dto/order-dto";
import {OrderService} from "../../services/order.service";
import {Page} from "../../shared/paging/page";
import {SnackService} from "../../services/snack.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  public assetBalances: AssetBalance[] = [];
  public selectedIndex: number;
  public displayedColumns: string[] = ['name', 'priceChange', 'price', 'amount', 'total', 'action'];

  constructor(
    private router: Router,
    private assetService: AssetService,
    private orderService: OrderService,
    private snackService: SnackService,
    private rxStompService: RxStompService,
    private subscriptionService: SubscriptionService,
    private loadingIndicatorService: LoadingIndicatorService,
  ) {
    //
  }

  private static toAssetBalance(source: AssetBalanceDto): AssetBalance {
    const assetBalance: AssetBalance = new AssetBalance();
    assetBalance.asset = source.asset;
    assetBalance.fullName = source.fullName;
    assetBalance.free = source.free;
    assetBalance.frozen = source.frozen;
    assetBalance.price = source.price.toFixed(2);
    assetBalance.priceChange = source.priceChange.toFixed(2);
    assetBalance.balance = source.balance.toFixed(2);
    assetBalance.quotation = source.quotation;
    return assetBalance;
  }

  private static updateAssetBalance(source: AssetBalanceDto, target: AssetBalance) {
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
  }

  fetchOpenOrders(assetBalance: AssetBalance) {
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

  fetchSubscription(assetBalance: AssetBalance) {
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
    this.assetService.listAssetBalances(httpParams)
      .subscribe((assetBalances: AssetBalanceDto[]) => {
        if (assetBalances) {
          this.assetBalances = assetBalances!.map(AssetsComponent.toAssetBalance)
          this.assetBalances.forEach((assetBalance: AssetBalance) => {
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

  toggleSubscription(assetBalance: AssetBalance) {
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

  addAssetTickerEvent(assetBalance: AssetBalance) {
    console.time("AssetsComponent::registerAssetTickerEvent");
    const topic = `/topic/${assetBalance.asset}-ticker`;
    assetBalance.subscription = this.rxStompService
      .watch(topic)
      .subscribe((message: Message) => {
        if (message) {
          const assetBalanceDto: AssetBalanceDto = JSON.parse(message.body);
          AssetsComponent.updateAssetBalance(assetBalanceDto, assetBalance);
        }
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.snackService.error(httpErrorResponse.error.errors[0].description);
      }, () => {
        console.timeEnd("AssetsComponent::registerAssetTickerEvent");
      })
  }

  removeAssetTickerEvent(assetBalance: AssetBalance) {
    console.time("AssetsComponent::removeAssetTickerEvent");
    if (assetBalance.subscription) {
      assetBalance.subscription.unsubscribe()
    }
    console.timeEnd("AssetsComponent::removeAssetTickerEvent");
  }

  onClickAssetBalance(assetName: string) {
    this.router.navigateByUrl("/trade?assetName=" + assetName);
  }

}
