import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubscriptionDto} from "../shared/dto/subscription-dto";
import {BaseService} from "./base.service";
import {Asset} from "../shared/domain/asset";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends BaseService {
  static readonly API_PATH: string = "/api/subscriptions"

  constructor(protected httpClient: HttpClient) {
    super(SubscriptionService.API_PATH, httpClient);
  }

  public getSubscription(assetName: string): Observable<SubscriptionDto> {
    const url: string = `${SubscriptionService.API_PATH}/${assetName}`;
    return this.httpClient.get<SubscriptionDto>(
      url,
      this.httpOptions
    );
  }

  public addSubscription(assetBalance: Asset): Observable<SubscriptionDto> {
    const url: string = `${SubscriptionService.API_PATH}/${assetBalance.name}/add`;
    return this.httpClient.post<SubscriptionDto>(
      url,
      {},
      this.httpOptions
    );
  }

  public removeSubscription(assetName: string): Observable<Response> {
    const url: string = `${SubscriptionService.API_PATH}/${assetName}/remove`;
    return this.httpClient.delete<Response>(url, this.httpOptions);
  }
}
