import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {BaseService} from "./base.service";
import {AccessTokenDto} from "../shared/dto/access-token-dto";
import {SigninDto} from "../shared/dto/signin-dto";
import {Globals} from "../shared/globals";

@Injectable({
  providedIn: 'root'
})
export class SigninService extends BaseService {
  static readonly API_PATH: string = "/api/signin"

  constructor(protected httpClient: HttpClient) {
    super(SigninService.API_PATH, httpClient);
  }

  public signin(signinDto: SigninDto): Observable<AccessTokenDto> {
    return this.httpClient.post<AccessTokenDto>(SigninService.API_PATH, signinDto, this.httpOptions)
      .pipe(
        tap((accessTokenResponseDto: AccessTokenDto) => {
          localStorage.setItem(Globals.ACCESS_TOKEN, accessTokenResponseDto.accessToken);
        }),
        catchError(super.handleError<AccessTokenDto>('login'))
      )
  }
}
