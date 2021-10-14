import {Component, OnInit} from '@angular/core';
import {Asset} from "../../services/wallet/models/asset";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";
import {WatchlistService} from "../../services/watchlist/watchlist.service";
import {WalletService} from "../../services/wallet/wallet.service";
import {HttpParams} from "@angular/common/http";
import {Page} from "../../shared/paging/page";
import {AssetDto} from "../../services/wallet/dto/asset-dto";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  columns: string[] = ['watchlist', 'coin', 'balance'];
  assets: Asset[] = [];
  length = 0;
  pageSize = 25;
  pageSizeOptions: number[] = [10, 50, 100];
  loading: boolean;

  constructor(private readonly watchlistService: WatchlistService, private readonly walletService: WalletService) {
    //
  }

  listAssets(httpParams: HttpParams) {
    this.loading = true;
    this.walletService.listAssets(httpParams)
      .subscribe((assets: AssetDto[]) => {
        this.assets = assets!.map(this.toAsset)
        this.loading = false;
      }, error => {
        this.loading = false;
      })
  }

  ngOnInit(): void {
    const params = new HttpParams()
      .set('page', 0)
      .set('size', this.pageSize);
    this.listAssets(params)
  }

  nextPage(event: PageEvent) {
    const params = new HttpParams()
      .set('page', event.pageIndex)
      .set('size', event.pageSize);
    this.listAssets(params);
    window.scroll(0, 0)
  }

  addToWatchlist(coin: string) {
    this.watchlistService.addToWatchlist(coin);
  }

  private toAsset(response: AssetDto): Asset {
    return new Asset(
      response.icon,
      response.coin,
      response.name,
      response.balance
    );
  }
}
