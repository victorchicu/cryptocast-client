import {Component, OnInit} from '@angular/core';
import {Asset} from "../../services/wallet/models/asset";
import {WatchlistService} from "../../services/watchlist/watchlist.service";
import {WalletService} from "../../services/wallet/wallet.service";
import {HttpParams} from "@angular/common/http";
import {AssetDto} from "../../services/wallet/dto/asset-dto";
import {SubscriptionDto} from "../../services/watchlist/dto/subscription-dto";
import {RxStompService} from "@stomp/ng2-stompjs";
import {Message} from "@stomp/stompjs";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  assets: Asset[] = [];
  loading: boolean;

  constructor(
    private readonly walletService: WalletService,
    private readonly rxStompService: RxStompService,
    private readonly watchlistService: WatchlistService
  ) {
    //
  }

  private static toAsset(source: AssetDto): Asset {
    let asset: Asset = new Asset();
    asset.icon = source.icon;
    asset.coin = source.coin;
    asset.name = source.name;
    asset.flagged = source.flagged;
    asset.balance = source.balance;
    asset.lowPrice = source.lowPrice;
    asset.highPrice = source.highPrice;
    asset.openPrice = source.openPrice;
    asset.averagePrice = source.averagePrice;
    return asset;
  }

  private static updateAsset(source: AssetDto, target: Asset) {
    target.openPrice = source.openPrice;
    target.highPrice = source.highPrice;
    target.lowPrice = source.lowPrice;
    target.averagePrice = source.averagePrice;
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
      .subscribe((assets: AssetDto[]) => {
        console.log(assets);
        this.assets = assets!.map(WalletComponent.toAsset)
        this.assets.forEach((asset: Asset) => {
          if (asset.flagged) {
            this.registerTickerEvent(asset);
          }
        });
        this.loading = false;
      }, error => {
        this.loading = false;
      })
  }

  addSubscription(asset: Asset) {
    this.watchlistService.addSubscription(asset)
      .subscribe((subscription: SubscriptionDto) => {
        asset.flagged = !asset.flagged;
        if (asset.flagged) {
          this.registerTickerEvent(asset);
        }
      });
  }

  private registerTickerEvent(asset: Asset) {
    const topic = `/topic/${asset.coin}-ticker`;
    this.rxStompService
      .watch(topic)
      .subscribe((message: Message) => {
        const assetDto: AssetDto = JSON.parse(message.body);
        WalletComponent.updateAsset(assetDto, asset);
      })
  }
}
