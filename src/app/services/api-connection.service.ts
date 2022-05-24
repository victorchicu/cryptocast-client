import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiKeyDto} from "../shared/dto/api-key-dto";

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService extends BaseService {
  static readonly API_PATH: string = "/api/connections"

  constructor(protected httpClient: HttpClient) {
    super(ApiConnectionService.API_PATH, httpClient);
  }

  public create(apiKey: ApiKeyDto): Observable<void> {
    const url: string = `${ApiConnectionService.API_PATH}`;
    return this.httpClient.post<void>(url, apiKey, this.httpOptions);
  }

  public delete(label: string): Observable<void> {
    const url: string = `${ApiConnectionService.API_PATH}/${label}`;
    return this.httpClient.delete<void>(url, this.httpOptions);
  }
}
