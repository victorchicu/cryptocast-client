import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AssetBalanceDto} from "../shared/dto/asset-balance-dto";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class WalletsOverviewService extends BaseService {
  static readonly API_PATH: string = "/api/wallets"

  constructor(protected httpClient: HttpClient) {
    super(WalletsOverviewService.API_PATH, httpClient);
  }

  public list(exchange: string, params: HttpParams): Observable<AssetBalanceDto[]> {
    const options = {
      params: params
    };
    const url: string = `${WalletsOverviewService.API_PATH}/${exchange}/balance`;
    return this.httpClient.get<AssetBalanceDto[]>(url, options);
  }
}
