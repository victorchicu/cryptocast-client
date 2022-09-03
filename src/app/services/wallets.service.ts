import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {WalletBalanceDto} from "../shared/dto/wallet-balance-dto";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class WalletsService extends BaseService {
  static readonly API_PATH: string = "/api/wallets"

  constructor(protected httpClient: HttpClient) {
    super(WalletsService.API_PATH, httpClient);
  }

  public list(exchange: string, params: HttpParams): Observable<WalletBalanceDto[]> {
    const options = {
      params: params
    };
    const url: string = `${WalletsService.API_PATH}/${exchange}/balance`;
    return this.httpClient.get<WalletBalanceDto[]>(url, options);
  }
}
