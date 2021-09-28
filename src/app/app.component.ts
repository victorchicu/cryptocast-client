import {Component, OnInit} from '@angular/core';
import {ExchangeService} from "./exchanges/exchange.service";
import {Page} from "./utils/page";
import {SymbolResponse} from "./exchanges/dto/symbol-response";
import {Symbol} from "./exchanges/models/symbol";
import {Pageable} from "./utils/pageable";
import {PageEvent} from "@angular/material/paginator";
import {HttpParams} from "@angular/common/http";

export interface SymbolElement {
  idx: number,
  name: string,
  alias: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  columns: string[] = ['idx', 'name', 'price'];
  symbols: Symbol[] = [];
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 50, 100];
  loading: boolean;

  constructor(private exchangeService: ExchangeService) {

  }

  listSupportedSymbols(httpParams: HttpParams) {
    this.loading = true;
    this.exchangeService.listSupportedSymbols(httpParams)
      .subscribe((page: Page<SymbolResponse[]>) => {
        console.log(page);
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
  }

  private toSymbol(response: SymbolResponse): Symbol {
    return new Symbol(
      response.idx,
      response.name,
      response.alias,
      response.price
    );
  }
}
