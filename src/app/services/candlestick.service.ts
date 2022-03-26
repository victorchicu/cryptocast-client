import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChipDto} from "../shared/dto/chip-dto";
import {CandlestickDto} from "../shared/dto/candlestick-dto";

@Injectable({
  providedIn: 'root'
})
export class CandlestickService extends BaseService {
  static readonly API_PATH: string = "/api/candlestick"

  constructor(protected httpClient: HttpClient) {
    super(CandlestickService.API_PATH, httpClient);
  }

  public getCandlestick(assetName: string, params: HttpParams): Observable<CandlestickDto[]> {
    const options = {
      params: params,
    }
    const url: string = `${CandlestickService.API_PATH}/${assetName}`;
    return this.httpClient.get<CandlestickDto[]>(url, options);
  }
}
