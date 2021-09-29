import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {CoinDto} from "./dto/coin-dto";
import {Page} from "../utils/page";

@Injectable({
  providedIn: 'root'
})
export class CoinMarketService {
  readonly API_MARKETS_PATH: string = "/api/markets"

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {
    httpClient.options(this.API_MARKETS_PATH, this.httpOptions)
  }

  public listSupportedCoins(params: HttpParams): Observable<Page<CoinDto[]>> {
    const options = {params: params};
    return this.httpClient.get<Page<CoinDto[]>>(this.API_MARKETS_PATH, options)
      .pipe(
        catchError(this.handleError<Page<CoinDto[]>>('listSupportedCoins'))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} -> ${error}`);
      return of(result as T);
    };
  }

}
