import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {SubscriptionDto} from "../../shared/dto/subscription-dto";
import {catchError} from "rxjs/operators";
import {BaseService} from "../base-service";
import {FundsBalance} from "../funds/models/funds-balance";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends BaseService {
  static readonly API_PATH: string = "/api/subscriptions"

  constructor(protected httpClient: HttpClient) {
    super(SubscriptionService.API_PATH, httpClient);
  }

  public addSubscription(fundsBalance: FundsBalance): Observable<SubscriptionDto> {
    const url: string = `${SubscriptionService.API_PATH}/${fundsBalance.asset}/add`;
    return this.httpClient.post<SubscriptionDto>(
      url,
      {
        balance: fundsBalance.free
      },
      this.httpOptions
    ).pipe(
      catchError(this.handleError<SubscriptionDto>('addSubscription'))
    )
  }

  public removeSubscription(fundsName: string): Observable<SubscriptionDto> {
    const url: string = `${SubscriptionService.API_PATH}/${fundsName}/remove`;
    return this.httpClient.delete<SubscriptionDto>(url, this.httpOptions)
      .pipe(
        catchError(super.handleError<SubscriptionDto>('removeSubscription'))
      )
  }
}
