import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {WatchlistDto} from "./dto/watchlist-dto";
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

  public addToWatchlist(symbolName: string): Observable<WatchlistDto> {
    const url: string = `${WatchlistService.API_WATCHLIST_PATH}/${symbolName}/add`;
    return this.httpClient.put<WatchlistDto>(url, {}, this.httpOptions)
      .pipe(
        catchError(this.handleError<WatchlistDto>('addToWatchlist'))
      )
  }

  public removeFromWatchlist(symbolName: string): Observable<WatchlistDto> {
    const url: string = `${WatchlistService.API_WATCHLIST_PATH}/${symbolName}/remove`;
    return this.httpClient.delete<WatchlistDto>(url, this.httpOptions)
      .pipe(
        catchError(super.handleError<WatchlistDto>('removeFromWatchlist'))
      )
  }
}
