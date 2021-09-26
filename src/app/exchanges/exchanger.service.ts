import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {SubscriptionResponse} from "../subscriptions/dto/subscription-response";
import {catchError} from "rxjs/operators";
import {SymbolResponse} from "./dto/symbol-response";
import {Page} from "../utils/page";

@Injectable({
  providedIn: 'root'
})
export class ExchangerService {
  readonly API_EXCHANGER_PATH: string = "/api/exchanger"

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {
    httpClient.options(this.API_EXCHANGER_PATH, this.httpOptions)
  }

  public listSymbols(): Observable<Page<SymbolResponse[]>> {
    return this.httpClient.get<Page<SymbolResponse[]>>(this.API_EXCHANGER_PATH, this.httpOptions)
      .pipe(
        catchError(this.handleError<Page<SymbolResponse[]>>('listSymbols'))
      )
  }

  public unsubscribe(symbolName: string): Observable<SubscriptionResponse> {
    const url: string = `${this.API_EXCHANGER_PATH}/${symbolName}/unsubscribe`;
    return this.httpClient.delete<SubscriptionResponse>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<SubscriptionResponse>('unsubscribe'))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} -> ${error}`);
      return of(result as T);
    };
  }
}
