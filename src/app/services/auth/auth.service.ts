import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {BaseService} from "../base-service";
import {AccessTokenResponseDto} from "./dto/access-token-response-dto";
import {AuthRequestDto} from "./dto/auth-request-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  static readonly API_PATH: string = "/api/auth"

  constructor(protected httpClient: HttpClient) {
    super(AuthService.API_PATH, httpClient);
  }

  public authorize(authRequestDto: AuthRequestDto): Observable<AccessTokenResponseDto> {
    return this.httpClient.post<AccessTokenResponseDto>(AuthService.API_PATH, authRequestDto, this.httpOptions)
      .pipe(
        catchError(super.handleError<AccessTokenResponseDto>('authorize'))
      )
  }
}
