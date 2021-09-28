import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {SymbolResponse} from "./dto/symbol-response";
import {Page} from "../utils/page";

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  readonly API_STOCK_EXCHANGES_PATH: string = "/api/exchanges"

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {
    httpClient.options(this.API_STOCK_EXCHANGES_PATH, this.httpOptions)
  }

  public listSupportedSymbols(params: HttpParams): Observable<Page<SymbolResponse[]>> {
    const options = {params: params};
    return this.httpClient.get<Page<SymbolResponse[]>>(this.API_STOCK_EXCHANGES_PATH, options)
      .pipe(
        catchError(this.handleError<Page<SymbolResponse[]>>('listSupportedSymbols'))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} -> ${error}`);
      return of(result as T);
    };
  }
}
