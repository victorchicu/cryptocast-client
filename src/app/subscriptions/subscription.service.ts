import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {SubscriptionResponse} from "./dto/subscription-response";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  readonly API_SUBSCRIPTION_PATH: string = "/api/subscriptions"

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {
    httpClient.options(this.API_SUBSCRIPTION_PATH, this.httpOptions)
  }

  public subscribe(symbolName: string): Observable<SubscriptionResponse> {
    const url: string = `${this.API_SUBSCRIPTION_PATH}/${symbolName}/subscribe`;
    return this.httpClient.post<SubscriptionResponse>(url, {}, this.httpOptions)
      .pipe(
        catchError(this.handleError<SubscriptionResponse>('subscribe'))
      )
  }

  public unsubscribe(symbolName: string): Observable<SubscriptionResponse> {
    const url: string = `${this.API_SUBSCRIPTION_PATH}/${symbolName}/unsubscribe`;
    return this.httpClient.delete<SubscriptionResponse>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<SubscriptionResponse>('unsubscribe'))
      )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
