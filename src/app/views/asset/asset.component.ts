import {Component, OnInit} from '@angular/core';
import {AssetBalance} from "../../services/asset/models/asset-balance";
import {SubscriptionService} from "../../services/subscription/subscription.service";
import {AssetService} from "../../services/asset/asset.service";
import {HttpParams} from "@angular/common/http";
import {AssetBalanceDto} from "../../services/asset/dto/asset-balance-dto";
import {SubscriptionDto} from "../../services/subscription/dto/subscription-dto";
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
    asset.asset = source.asset;
    asset.fullName = source.fullName;
    asset.iconIndex = source.iconIndex;
    asset.flagged = source.flagged;
    asset.free = source.free;
    asset.frozen = source.frozen;
    asset.price = source.price.toFixed(2);
    asset.balance = source.balance.toFixed(2);
    asset.quotation = source.quotation;
    return asset;
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

  registerTickerEvent(asset: AssetBalance) {
    const topic = `/topic/${asset.asset}-ticker`;
    console.log(topic)
    this.rxStompService
      .watch(topic)
      .subscribe((message: Message) => {
        const assetDto: AssetBalanceDto = JSON.parse(message.body);
        AssetComponent.updateAssetBalance(assetDto, asset);
      })
  }
}
