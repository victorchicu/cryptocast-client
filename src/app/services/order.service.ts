import { Injectable } from '@angular/core';
import {BaseService} from "./base-service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TestOrderDto} from "../shared/dto/test-order-dto";
import {OrderDto} from "../shared/dto/order-dto";
import {Page} from "../shared/paging/page";

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {
  static readonly API_PATH: string = "/api/orders"

  constructor(protected httpClient: HttpClient) {
    super(OrderService.API_PATH, httpClient);
  }

  public getAllOrders(assetName: string, params: HttpParams): Observable<Page<OrderDto[]>> {
    const url: string = `${OrderService.API_PATH}/${assetName}`;
    const options = {
      params: params,
    }
    return this.httpClient.get<Page<OrderDto[]>>(url, options);
  }

  public getOpenOrders(assetName: string, params: HttpParams): Observable<Page<OrderDto[]>> {
    const url: string = `${OrderService.API_PATH}/open?assetName=${assetName}`;
    const options = {
      params: params,
    }
    return this.httpClient.get<Page<OrderDto[]>>(url, options);
  }

  public createTestOrder(assetName: string, testOrderDto: TestOrderDto): Observable<void> {
    const url: string = `${OrderService.API_PATH}/${assetName}`;
    return this.httpClient.post<void>(
      url,
      testOrderDto,
      this.httpOptions
    );
  }
}
