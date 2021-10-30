import {Component, OnInit} from '@angular/core';
import {AssetBalance} from "../../services/assets/models/asset-balance";
import {SubscriptionService} from "../../services/subscriptions/subscription.service";
import {AssetService} from "../../services/assets/asset.service";
import {HttpParams} from "@angular/common/http";
import {AssetBalanceDto} from "../../services/assets/dto/asset-balance-dto";
import {SubscriptionDto} from "../../services/subscriptions/dto/subscription-dto";
import {RxStompService} from "@stomp/ng2-stompjs";
import {Message} from "@stomp/stompjs";

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {
  assets: AssetBalance[] = [];
  loading: boolean;

  constructor(
    private readonly walletService: AssetService,
    private readonly rxStompService: RxStompService,
    private readonly subscriptionService: SubscriptionService
  ) {
    //
  }

  private static toAssetBalance(source: AssetBalanceDto): AssetBalance {
    let asset: AssetBalance = new AssetBalance();
    asset.icon = source.icon;
    asset.coin = source.coin;
    asset.name = source.name;
    asset.flagged = source.flagged;
    asset.balance = source.balance;
    asset.usdtValue = source.usdtValue;
    return asset;
  }

  private static updateAssetBalance(source: AssetBalanceDto, target: AssetBalance) {
    target.balance = source.balance;
    target.usdtValue = source.usdtValue;
  }

  ngOnInit(): void {
    const params = new HttpParams()
    // .set('page', 0)
    // .set('size', this.pageSize);
    this.listAssets(params)
  }

  listAssets(httpParams: HttpParams) {
    this.loading = true;
    this.walletService.listAssets(httpParams)
      .subscribe((assets: AssetBalanceDto[]) => {
        console.log(assets);
        this.assets = assets!.map(AssetComponent.toAssetBalance)
        this.assets.forEach((asset: AssetBalance) => {
          if (asset.flagged) {
            this.registerTickerEvent(asset);
          }
        });
        this.loading = false;
      }, error => {
        this.loading = false;
      })
  }

  addSubscription(asset: AssetBalance) {
    this.subscriptionService.addSubscription(asset)
      .subscribe((subscription: SubscriptionDto) => {
        asset.flagged = !asset.flagged;
        if (asset.flagged) {
          this.registerTickerEvent(asset);
        }
      });
  }

  private registerTickerEvent(asset: AssetBalance) {
    const topic = `/topic/${asset.coin}-ticker`;
    console.log(topic)
    this.rxStompService
      .watch(topic)
      .subscribe((message: Message) => {
        const assetDto: AssetBalanceDto = JSON.parse(message.body);
        console.log(assetDto);
        AssetComponent.updateAssetBalance(assetDto, asset);
      })
  }
}
