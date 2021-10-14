import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {SubscriptionDto} from "./dto/subscription-dto";
import {catchError} from "rxjs/operators";
import {BaseService} from "../base-service";

@Injectable({
  providedIn: 'root'
})
export class WatchlistService extends BaseService {
  static readonly API_WATCHLIST_PATH: string = "/api/watchlist"

  constructor(protected httpClient: HttpClient) {
    super(WatchlistService.API_WATCHLIST_PATH, httpClient);
  }

  public addSubscription(assetName: string): Observable<SubscriptionDto> {
    const url: string = `${WatchlistService.API_WATCHLIST_PATH}/${assetName}/add`;
    console.log(url)
    return this.httpClient.post<SubscriptionDto>(url, {}, this.httpOptions)
      .pipe(
        catchError(this.handleError<SubscriptionDto>('addSubscription'))
      )
  }

  public removeSubscription(assetName: string): Observable<SubscriptionDto> {
    const url: string = `${WatchlistService.API_WATCHLIST_PATH}/${assetName}/remove`;
    return this.httpClient.delete<SubscriptionDto>(url, this.httpOptions)
      .pipe(
        catchError(super.handleError<SubscriptionDto>('removeSubscription'))
      )
  }
}
