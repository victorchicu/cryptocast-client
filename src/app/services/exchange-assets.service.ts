import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AssetDto} from "../shared/dto/asset-dto";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class ExchangeAssetsService extends BaseService {
  static readonly API_PATH: string = "/api/exchanges"

  constructor(protected httpClient: HttpClient) {
    super(ExchangeAssetsService.API_PATH, httpClient);
  }

  public list(exchange: string, params: HttpParams): Observable<AssetDto[]> {
    const options = {
      params: params
    };
    const url: string = `${ExchangeAssetsService.API_PATH}/${exchange}/assets`;
    return this.httpClient.get<AssetDto[]>(url, options);
  }
}
