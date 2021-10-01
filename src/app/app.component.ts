import {Component, OnInit} from '@angular/core';
import {CoinAggregatorService} from "./aggregators/coin-aggregator.service";
import {Page} from "./utils/page";
import {CoinDto} from "./aggregators/dto/coin-dto";
import {Coin} from "./aggregators/models/coin";
import {PageEvent} from "@angular/material/paginator";
import {HttpParams} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";
import {WatchlistService} from "./watchlist/watchlist.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  columns: string[] = ['watchlist', 'fullName', 'price'];
  symbols: Coin[] = [];
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 50, 100];
  loading: boolean;

  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly iconRegistry: MatIconRegistry,
    private readonly watchlistService: WatchlistService,
    private readonly coinMarketService: CoinAggregatorService
  ) {
    const icons = [
      ["star_outline", "/assets/star_outline_black_24dp.svg"],
      ["bookmark", "/assets/bookmark_black_24dp.svg"],
      ["bookmark_border", "/assets/bookmark_border_black_24dp.svg"],
    ];
    icons.forEach((entry: string[]) => {
      this.iconRegistry.addSvgIcon(
        entry[0],
        this.domSanitizer.bypassSecurityTrustResourceUrl(entry[1]),
      )
    })
  }

  listSupportedCoins(httpParams: HttpParams) {
    this.loading = true;
    this.coinMarketService.listSupportedCoins(httpParams)
      .subscribe((page: Page<CoinDto[]>) => {
        this.length = page.totalElements;
        this.symbols = page.content!.map(this.toSymbol)
        this.loading = false;
      }, error => {
        this.loading = false;
      })
  }

  ngOnInit(): void {
    const params = new HttpParams()
      .set('page', 0)
      .set('size', this.pageSize);
    this.listSupportedCoins(params)
  }

  nextPage(event: PageEvent) {
    const params = new HttpParams()
      .set('page', event.pageIndex)
      .set('size', event.pageSize);
    this.listSupportedCoins(params);
  }

  private toSymbol(response: CoinDto): Coin {
    return new Coin(
      response.icon,
      response.name,
      response.alias,
      response.price
    );
  }

  toggleWatchlist(coinName: string) {
    console.log(coinName)
    // this.watchlistService.addToWatchlist(symbolName);
  }

  pageChanged($event: any) {

  }
}
