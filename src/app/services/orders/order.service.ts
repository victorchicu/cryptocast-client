import { Injectable } from '@angular/core';
import {BaseService} from "../base-service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {TestOrderDto} from "../../shared/dto/test-order-dto";
import {OrderDto} from "../../shared/dto/order-dto";
import {Page} from "../../shared/paging/page";

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {
  static readonly API_PATH: string = "/api/orders"

  constructor(protected httpClient: HttpClient) {
    super(OrderService.API_PATH, httpClient);
  }

  public listOrders(params: HttpParams): Observable<Page<OrderDto[]>> {
    const options = {
      params: params,
    }
    return this.httpClient.get<Page<OrderDto[]>>(OrderService.API_PATH, options)
      .pipe(
        catchError(this.handleError<Page<OrderDto[]>>('listOrders'))
      )
  }

  public createOrder(fundsName: string, orderDto: TestOrderDto): Observable<TestOrderDto> {
    const url: string = `${OrderService.API_PATH}/${fundsName}`;
    return this.httpClient.post<TestOrderDto>(
      url,
      orderDto,
      this.httpOptions
    ).pipe(
      catchError(this.handleError<TestOrderDto>('createOrder'))
    )
  }
}
