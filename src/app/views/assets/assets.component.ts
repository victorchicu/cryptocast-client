import {Component, OnInit} from '@angular/core';
import {AssetBalance} from "../../shared/domain/asset-balance";
import {SubscriptionService} from "../../services/subscription.service";
import {AssetService} from "../../services/asset.service";
import {HttpParams} from "@angular/common/http";
import {AssetBalanceDto} from "../../shared/dto/asset-balance-dto";
import {SubscriptionDto} from "../../shared/dto/subscription-dto";
import {RxStompService} from "@stomp/ng2-stompjs";
import {Message} from "@stomp/stompjs";
import {LoadingIndicatorService} from "../../services/loading-indicator.service";
import {OrderDto} from "../../shared/dto/order-dto";
import {OrderService} from "../../services/order.service";
import {Page} from "../../shared/paging/page";
import {OrderComponent} from "../orders/order-component";
import {Order} from "../../shared/domain/order";

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  assetBalances: AssetBalance[] = [];

  constructor(
    private assetService: AssetService,
    private orderService: OrderService,
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
    assetBalance.iconIndex = source.iconIndex;
    assetBalance.flagged = source.flagged;
    assetBalance.free = source.free;
    assetBalance.frozen = source.frozen;
    assetBalance.price = source.price.toFixed(2);
    assetBalance.balance = source.balance.toFixed(2);
    assetBalance.quotation = source.quotation;
    return assetBalance;
  }

  private static updateAssetBalance(source: AssetBalanceDto, target: AssetBalance) {
    target.free = source.free;
    target.frozen = source.frozen;
    target.price = source.price.toFixed(2);
    target.balance = source.balance.toFixed(2);
    target.quotation = source.quotation;
  }

  ngOnInit(): void {
    const params = new HttpParams()
    // .set('page', 0)
    // .set('size', this.pageSize);
    this.fetchAssetBalances(params)
  }

  addSubscription(assetBalance: AssetBalance) {
    console.log("AssetsComponent::addSubscription BEGIN");
    this.subscriptionService.addSubscription(assetBalance)
      .subscribe((subscription: SubscriptionDto) => {
        if (subscription) {
          assetBalance.flagged = !assetBalance.flagged;
          if (assetBalance.flagged) {
            this.registerTickerEvent(assetBalance);
          }
        }
      }, error => {
        console.log(error)
      });
    console.log("AssetsComponent::addSubscription END");
  }

  fetchOpenOrders(assetBalance: AssetBalance) {
    console.log("AssetsComponent::fetchOpenOrders BEGIN");
    const params = new HttpParams()
    // .set('page', 0)
    // .set('size', this.pageSize);
    this.orderService.getOpenOrders(assetBalance.asset, params)
      .subscribe((page: Page<OrderDto[]>) => {
        assetBalance.openOrders = page.totalElements
      }, error => {
        console.log(error)
      });
    console.log("AssetsComponent::fetchOpenOrders END");
  }

  fetchAssetBalances(httpParams: HttpParams) {
    console.log("AssetsComponent::fetchAssetBalances BEGIN");
    this.loadingIndicatorService.setLoading(true);
    this.assetService.listAssetBalances(httpParams)
      .subscribe((assetBalances: AssetBalanceDto[]) => {
        if (assetBalances) {
          this.assetBalances = assetBalances!.map(AssetsComponent.toAssetBalance)
          this.assetBalances.forEach((assetBalance: AssetBalance) => {
            if (assetBalance.flagged) {
              this.registerTickerEvent(assetBalance);
            }
            this.fetchOpenOrders(assetBalance);
          });
        }
        this.loadingIndicatorService.setLoading(false);
      }, error => {
        console.log(error)
        this.loadingIndicatorService.setLoading(false);
      })
    console.log("AssetsComponent::fetchAssetBalances END");
  }

  registerTickerEvent(assetBalance: AssetBalance) {
    console.log("AssetsComponent::registerTickerEvent BEGIN");
    const topic = `/topic/${assetBalance.asset}-ticker`;
    this.rxStompService
      .watch(topic)
      .subscribe((message: Message) => {
        if (message) {
          const assetBalanceDto: AssetBalanceDto = JSON.parse(message.body);
          AssetsComponent.updateAssetBalance(assetBalanceDto, assetBalance);
        }
      })
    console.log("AssetsComponent::registerTickerEvent END");
  }
}
