import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {SignupRequestDto} from "./dto/signup-request-dto";
import {BaseService} from "../base-service";
import {AccessTokenResponseDto} from "./dto/access-token-response-dto";

@Injectable({
  providedIn: 'root'
})
export class SignupService extends BaseService {
  static readonly API_PATH: string = "/api/signup"

  constructor(protected httpClient: HttpClient) {
    super(SignupService.API_PATH, httpClient);
  }

  public signup(signupRequestDto: SignupRequestDto): Observable<AccessTokenResponseDto> {
    return this.httpClient.post<AccessTokenResponseDto>(SignupService.API_PATH, signupRequestDto, this.httpOptions)
      .pipe(
        catchError(super.handleError<AccessTokenResponseDto>('signup'))
      )
  }
}
