import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {BaseService} from "../base-service";
import {AccessTokenResponseDto} from "./dto/access-token-response-dto";
import {LoginRequestDto} from "./dto/login-request-dto";
import {Globals} from "../../shared/globals";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {
  static readonly API_PATH: string = "/api/login"

  constructor(protected httpClient: HttpClient) {
    super(LoginService.API_PATH, httpClient);
  }

  public login(loginRequestDto: LoginRequestDto): Observable<AccessTokenResponseDto> {
    return this.httpClient.post<AccessTokenResponseDto>(LoginService.API_PATH, loginRequestDto, this.httpOptions)
      .pipe(
        tap((accessTokenResponseDto: AccessTokenResponseDto) => {
          localStorage.setItem(Globals.ACCESS_TOKEN, accessTokenResponseDto.accessToken);
        }),
        catchError(super.handleError<AccessTokenResponseDto>('login'))
      )
  }
}
