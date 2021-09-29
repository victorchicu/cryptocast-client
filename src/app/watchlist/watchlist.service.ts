import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {WatchlistDto} from "./dto/watchlist-dto";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  readonly API_WATCHLIST_PATH: string = "/api/watchlist"

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {
    httpClient.options(this.API_WATCHLIST_PATH, this.httpOptions)
  }

  public addToWatchlist(coinName: string): Observable<WatchlistDto> {
    const url: string = `${this.API_WATCHLIST_PATH}/${coinName}/add`;
    return this.httpClient.put<WatchlistDto>(url, {}, this.httpOptions)
      .pipe(
        catchError(this.handleError<WatchlistDto>('add'))
      )
  }

  public removeFromWatchlist(symbolName: string): Observable<WatchlistDto> {
    const url: string = `${this.API_WATCHLIST_PATH}/${symbolName}/remove`;
    return this.httpClient.delete<WatchlistDto>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<WatchlistDto>('remove'))
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
