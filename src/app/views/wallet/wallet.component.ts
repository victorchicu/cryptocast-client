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
  columns: string[] = ['watchlist', 'coin', 'balance'];
  assets: Asset[] = [];
  loading: boolean;

  constructor(
    private readonly walletService: WalletService,
    private readonly rxStompService: RxStompService,
    private readonly watchlistService: WatchlistService
  ) {
    //
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
        this.assets = assets!.map(WalletComponent.toAsset)
        assets.forEach((assetDto: AssetDto) => {
          if (assetDto.flagged) {
            const topic = `/topic/${assetDto.coin}USDT-ticker`;
            console.log(`Subscribe to: ${topic}`)
            this.rxStompService
              .watch(topic)
              .subscribe((message: Message) => {
                console.log(message);
              })
          }
        });
        this.loading = false;
      }, error => {
        this.loading = false;
      })
  }

  addSubscription(asset: Asset) {
    this.watchlistService.addSubscription(asset.coin)
      .subscribe((subscription: SubscriptionDto) => {
        asset.flagged = !asset.flagged;
        if (asset.flagged) {
          const topic = `/topic/${asset.coin}USDT-ticker`;
          console.log(`Subscribe to: ${topic}`)
          this.rxStompService
            .watch(topic)
            .subscribe((message: Message) => {
              console.log(message);
            })
        }
      });
  }

  private static toAsset(source: AssetDto): Asset {
    let asset: Asset = new Asset();
    asset.icon = source.icon;
    asset.coin = source.coin;
    asset.name = source.name;
    asset.balance = source.balance;
    asset.flagged = source.flagged;
    return asset;
  }
}
