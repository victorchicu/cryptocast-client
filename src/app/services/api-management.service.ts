import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiKeyDto} from "../shared/dto/api-key-dto";

@Injectable({
  providedIn: 'root'
})
export class ApiManagementService extends BaseService {
  static readonly API_PATH: string = "/api/management"

  constructor(protected httpClient: HttpClient) {
    super(ApiManagementService.API_PATH, httpClient);
  }

  public list(): Observable<ApiKeyDto[]> {
    const url: string = `${ApiManagementService.API_PATH}`;
    return this.httpClient.get<ApiKeyDto[]>(url, this.httpOptions);
  }

  public create(apiKey: ApiKeyDto): Observable<void> {
    const url: string = `${ApiManagementService.API_PATH}`;
    return this.httpClient.post<void>(url, apiKey, this.httpOptions);
  }

  public delete(label: string): Observable<void> {
    const url: string = `${ApiManagementService.API_PATH}/${label}`;
    return this.httpClient.delete<void>(url, this.httpOptions);
  }
}
