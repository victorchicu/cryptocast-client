import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChipDto} from "../shared/dto/chip-dto";
import {OhlcDto} from "../shared/dto/ohlc-dto";

@Injectable({
  providedIn: 'root'
})
export class StocksService extends BaseService {
  static readonly API_PATH: string = "/api/stocks"

  constructor(protected httpClient: HttpClient) {
    super(StocksService.API_PATH, httpClient);
  }

  public listOhlc(assetName: string, params: HttpParams): Observable<OhlcDto[]> {
    const options = {
      params: params,
    }
    const url: string = `${StocksService.API_PATH}/${assetName}`;
    return this.httpClient.get<OhlcDto[]>(url, options);
  }
}
