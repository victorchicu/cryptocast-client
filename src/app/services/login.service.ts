import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {BaseService} from "./base-service";
import {AccessTokenDto} from "../shared/dto/access-token-dto";
import {LoginRequestDto} from "../shared/dto/login-request-dto";
import {Globals} from "../shared/globals";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {
  static readonly API_PATH: string = "/api/login"

  constructor(protected httpClient: HttpClient) {
    super(LoginService.API_PATH, httpClient);
  }

  public login(loginRequestDto: LoginRequestDto): Observable<AccessTokenDto> {
    return this.httpClient.post<AccessTokenDto>(LoginService.API_PATH, loginRequestDto, this.httpOptions)
      .pipe(
        tap((accessTokenResponseDto: AccessTokenDto) => {
          localStorage.setItem(Globals.ACCESS_TOKEN, accessTokenResponseDto.accessToken);
        }),
        catchError(super.handleError<AccessTokenDto>('login'))
      )
  }
}
