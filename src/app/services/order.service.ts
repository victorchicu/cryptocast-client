import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderRequestDto} from "../shared/dto/order-request-dto";
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

  public createOrder(assetName: string, testOrderDto: OrderRequestDto): Observable<void> {
    const url: string = `${OrderService.API_PATH}/${assetName}`;
    return this.httpClient.post<void>(
      url,
      testOrderDto,
      this.httpOptions
    );
  }

  public cancelOrder(orderId: number, assetName: string): Observable<void> {
    const url: string = `${OrderService.API_PATH}/${orderId}/${assetName}`;
    return this.httpClient.delete<void>(
      url,
      this.httpOptions
    );
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
}
