import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {SignupDto} from "./dto/signup-dto";
import {BaseService} from "../base-service";
import {AccessTokenDto} from "./dto/access-token-dto";

@Injectable({
  providedIn: 'root'
})
export class SignupService extends BaseService {
  static readonly API_PATH: string = "/api/signup"

  constructor(protected httpClient: HttpClient) {
    super(SignupService.API_PATH, httpClient);
  }

  public signup(signupDto: SignupDto): Observable<AccessTokenDto> {
    return this.httpClient.post<AccessTokenDto>(SignupService.API_PATH, signupDto, this.httpOptions)
      .pipe(
        catchError(super.handleError<AccessTokenDto>('signup'))
      )
  }
}
