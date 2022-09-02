import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WalletDto} from "../shared/dto/wallet-dto";

@Injectable({
  providedIn: 'root'
})
export class WalletService extends BaseService {
  static readonly API_PATH: string = "/api/management"

  constructor(protected httpClient: HttpClient) {
    super(WalletService.API_PATH, httpClient);
  }

  public list(): Observable<WalletDto[]> {
    const url: string = `${WalletService.API_PATH}`;
    return this.httpClient.get<WalletDto[]>(url, this.httpOptions);
  }

  public create(apiKey: WalletDto): Observable<void> {
    const url: string = `${WalletService.API_PATH}`;
    return this.httpClient.post<void>(url, apiKey, this.httpOptions);
  }

  public delete(label: string): Observable<void> {
    const url: string = `${WalletService.API_PATH}/${label}`;
    return this.httpClient.delete<void>(url, this.httpOptions);
  }
}
