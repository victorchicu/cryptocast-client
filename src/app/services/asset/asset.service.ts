import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of, Subscriber} from "rxjs";
import {catchError} from "rxjs/operators";
import {AssetBalanceDto} from "../../shared/dto/asset-balance-dto";
import {Page} from "../../shared/paging/page";
import {BaseService} from "../base-service";

@Injectable({
  providedIn: 'root'
})
export class AssetService extends BaseService {
  static readonly MOCK_DATA = [{
    "coin": "XLM",
    "name": "Stellar Lumens",
    "icon": 512,
    "flagged": false,
    "balance": 133,
    "fiatBalance": null
  }, {
    "coin": "USDT",
    "name": "TetherUS",
    "icon": 825,
    "flagged": false,
    "balance": 0.46065993,
    "fiatBalance": null
  }, {
    "coin": "BNB",
    "name": "BNB",
    "icon": 1839,
    "flagged": false,
    "balance": 0.00236037,
    "fiatBalance": null
  }, {
    "coin": "SOL",
    "name": "Solana",
    "icon": 5426,
    "flagged": false,
    "balance": 2E-8,
    "fiatBalance": null
  }];

  static readonly API_PATH: string = "/api/assets"

  constructor(protected httpClient: HttpClient) {
    super(AssetService.API_PATH, httpClient);
  }

  public listAssets(params: HttpParams): Observable<AssetBalanceDto[]> {
    // const assets: AssetDto[] = JSON.parse(JSON.stringify(WalletService.MOCK_DATA));
    // return new Observable<AssetDto[]>(subscriber => {
    //   subscriber.next(assets);
    // })
    const options = {params: params};
    return this.httpClient.get<AssetBalanceDto[]>(AssetService.API_PATH, options)
      .pipe(
        catchError(super.handleError<AssetBalanceDto[]>('listAssets'))
      );
  }
}
