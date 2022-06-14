import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiKeyDto} from "../shared/dto/api-key-dto";
import {ExchangeType} from "../shared/enums/exchangeType";
import {ExchangeDto} from "../shared/dto/exchange-dto";

@Injectable({
  providedIn: 'root'
})
export class ExchangeConnectService extends BaseService {
  static readonly API_PATH: string = "/api/exchanges"

  constructor(protected httpClient: HttpClient) {
    super(ExchangeConnectService.API_PATH, httpClient);
  }

  public list(): Observable<ExchangeDto[]> {
    const url: string = `${ExchangeConnectService.API_PATH}`;
    return this.httpClient.get<ExchangeDto[]>(url, this.httpOptions);
  }

  public create(apiKey: ApiKeyDto): Observable<void> {
    const url: string = `${ExchangeConnectService.API_PATH}`;
    return this.httpClient.post<void>(url, apiKey, this.httpOptions);
  }

  public delete(label: string): Observable<void> {
    const url: string = `${ExchangeConnectService.API_PATH}/${label}`;
    return this.httpClient.delete<void>(url, this.httpOptions);
  }
}
