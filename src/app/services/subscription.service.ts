import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {SubscriptionDto} from "../shared/dto/subscription-dto";
import {catchError} from "rxjs/operators";
import {BaseService} from "./base-service";
import {AssetBalance} from "../shared/domain/asset-balance";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends BaseService {
  static readonly API_PATH: string = "/api/subscriptions"

  constructor(protected httpClient: HttpClient) {
    super(SubscriptionService.API_PATH, httpClient);
  }

  public addSubscription(assetBalance: AssetBalance): Observable<SubscriptionDto> {
    const url: string = `${SubscriptionService.API_PATH}/${assetBalance.asset}/add`;
    return this.httpClient.post<SubscriptionDto>(
      url,
      {
        balance: assetBalance.free
      },
      this.httpOptions
    ).pipe(
      catchError(this.handleError<SubscriptionDto>('addSubscription'))
    )
  }

  public removeSubscription(assetName: string): Observable<SubscriptionDto> {
    const url: string = `${SubscriptionService.API_PATH}/${assetName}/remove`;
    return this.httpClient.delete<SubscriptionDto>(url, this.httpOptions)
      .pipe(
        catchError(super.handleError<SubscriptionDto>('removeSubscription'))
      )
  }
}
