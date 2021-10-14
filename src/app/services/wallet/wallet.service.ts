import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {AssetDto} from "./dto/asset-dto";
import {Page} from "../../shared/paging/page";
import {BaseService} from "../base-service";

@Injectable({
  providedIn: 'root'
})
export class WalletService extends BaseService {
  static readonly API_WALLET_PATH: string = "/api/wallet"

  constructor(protected httpClient: HttpClient) {
    super(WalletService.API_WALLET_PATH, httpClient);
  }

  public listAssets(params: HttpParams): Observable<AssetDto[]> {
    const options = {params: params};
    return this.httpClient.get<AssetDto[]>(WalletService.API_WALLET_PATH + "/assets", options)
      .pipe(
        catchError(super.handleError<AssetDto[]>('listAssets'))
      )
  }
}
