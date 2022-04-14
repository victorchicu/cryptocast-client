import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChipDto} from "../shared/dto/chip-dto";
import {OhlcDto} from "../shared/dto/ohlc-dto";

@Injectable({
  providedIn: 'root'
})
export class OhlcService extends BaseService {
  static readonly API_PATH: string = "/api/ohlc"

  constructor(protected httpClient: HttpClient) {
    super(OhlcService.API_PATH, httpClient);
  }

  public list(assetName: string, params: HttpParams): Observable<OhlcDto[]> {
    const options = {
      params: params,
    }
    const url: string = `${OhlcService.API_PATH}/${assetName}`;
    return this.httpClient.get<OhlcDto[]>(url, options);
  }
}
