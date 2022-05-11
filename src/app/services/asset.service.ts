import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {AssetDto} from "../shared/dto/asset-dto";
import {BaseService} from "./base.service";
import {ChipDto} from "../shared/dto/chip-dto";
import {AssetPriceDto} from "../shared/dto/asset-price-dto";
import {Asset} from "../shared/domain/asset";

@Injectable({
  providedIn: 'root'
})
export class AssetService extends BaseService {
  static readonly API_PATH: string = "/api/assets"

  constructor(protected httpClient: HttpClient) {
    super(AssetService.API_PATH, httpClient);
  }

  public getAsset(assetName: string): Observable<AssetDto> {
    const url: string = `${AssetService.API_PATH}/${assetName}`;
    return this.httpClient.get<AssetDto>(url);
  }

  public listAssets(params: HttpParams): Observable<AssetDto[]> {
    const options = {
      params: params
    };
    return this.httpClient.get<AssetDto[]>(
      'assets/assets.json',
      // AssetService.API_PATH,
      options
    );
  }

  public getAssetPrice(assetName: string): Observable<AssetPriceDto> {
    const url: string = `${AssetService.API_PATH}/${assetName}/price`;
    return this.httpClient.get<AssetPriceDto>(url);
  }

  public availableAssets(params: HttpParams): Observable<ChipDto[]> {
    const url: string = `${AssetService.API_PATH}/available`;
    const options = {
      params: params,
    }
    return this.httpClient.get<ChipDto[]>(url, options);
  }
}
