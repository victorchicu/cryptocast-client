import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {SymbolDto} from "./dto/symbol-dto";
import {Page} from "../../shared/paging/page";
import {BaseService} from "../base-service";

@Injectable({
  providedIn: 'root'
})
export class RankService extends BaseService {
  static readonly API_AGGREGATOR_PATH: string = "/api/rank"

  constructor(protected httpClient: HttpClient) {
    super(RankService.API_AGGREGATOR_PATH, httpClient);
  }

  public listSupportedSymbols(params: HttpParams): Observable<Page<SymbolDto[]>> {
    const options = {params: params};
    return this.httpClient.get<Page<SymbolDto[]>>(RankService.API_AGGREGATOR_PATH, options)
      .pipe(
        catchError(super.handleError<Page<SymbolDto[]>>('listSupportedSymbols'))
      )
  }
}
