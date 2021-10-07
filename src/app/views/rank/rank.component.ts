import { Component, OnInit } from '@angular/core';
import {Symbol} from "../../services/rank/models/symbol";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";
import {WatchlistService} from "../../services/watchlist/watchlist.service";
import {RankService} from "../../services/rank/rank.service";
import {HttpParams} from "@angular/common/http";
import {Page} from "../../utils/paging/page";
import {SymbolDto} from "../../services/rank/dto/symbol-dto";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-symbol-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
})
export class RankComponent implements OnInit {
  columns: string[] = ['watchlist', 'fullName', 'price'];
  symbols: Symbol[] = [];
  length = 0;
  pageSize = 25;
  pageSizeOptions: number[] = [10, 50, 100];
  loading: boolean;

  constructor(private readonly watchlistService: WatchlistService, private readonly symbolAggregatorService: RankService) {

  }

  listSupportedSymbols(httpParams: HttpParams) {
    this.loading = true;
    this.symbolAggregatorService.listSupportedSymbols(httpParams)
      .subscribe((page: Page<SymbolDto[]>) => {
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
    this.listSupportedSymbols(params)
  }

  nextPage(event: PageEvent) {
    const params = new HttpParams()
      .set('page', event.pageIndex)
      .set('size', event.pageSize);
    this.listSupportedSymbols(params);
    window.scroll(0, 0)
  }

  private toSymbol(response: SymbolDto): Symbol {
    return new Symbol(
      response.icon,
      response.name,
      response.alias,
      response.price
    );
  }

  addToWatchlist(coinName: string) {
    this.watchlistService.addToWatchlist(coinName);
  }

  pageChanged($event: any) {

  }
}
