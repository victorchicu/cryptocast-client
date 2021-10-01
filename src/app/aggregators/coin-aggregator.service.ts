import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {CoinDto} from "./dto/coin-dto";
import {Page} from "../utils/page";

@Injectable({
  providedIn: 'root'
})
export class CoinAggregatorService {
  readonly API_AGGREGATOR_PATH: string = "/api/aggregator"

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {
    httpClient.options(this.API_AGGREGATOR_PATH, this.httpOptions)
  }

  public listSupportedCoins(params: HttpParams): Observable<Page<CoinDto[]>> {
    const options = {params: params};
    return this.httpClient.get<Page<CoinDto[]>>(this.API_AGGREGATOR_PATH, options)
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
