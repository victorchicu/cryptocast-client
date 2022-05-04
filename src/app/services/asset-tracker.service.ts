import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TrackingDto} from "../shared/dto/tracking-dto";
import {BaseService} from "./base.service";
import {Asset} from "../shared/domain/asset";

@Injectable({
  providedIn: 'root'
})
export class AssetTrackerService extends BaseService {
  static readonly API_PATH: string = "/api/trackers"

  constructor(protected httpClient: HttpClient) {
    super(AssetTrackerService.API_PATH, httpClient);
  }

  public getAssetTracker(assetName: string): Observable<TrackingDto> {
    const url: string = `${AssetTrackerService.API_PATH}/${assetName}`;
    return this.httpClient.get<TrackingDto>(
      url,
      this.httpOptions
    );
  }

  public addAssetTracker(assetBalance: Asset): Observable<TrackingDto> {
    const url: string = `${AssetTrackerService.API_PATH}/${assetBalance.name}/add`;
    return this.httpClient.post<TrackingDto>(
      url,
      {},
      this.httpOptions
    );
  }

  public removeAssetTracker(assetName: string): Observable<Response> {
    const url: string = `${AssetTrackerService.API_PATH}/${assetName}/remove`;
    return this.httpClient.delete<Response>(url, this.httpOptions);
  }
}
