import {catchError} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {BaseService} from "../base-service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LogoutService extends BaseService {
  static readonly API_PATH: string = "/api/logout"

  constructor(protected httpClient: HttpClient) {
    super(LogoutService.API_PATH, httpClient);
  }

  public logout() {
    return this.httpClient.get<any>(LogoutService.API_PATH, this.httpOptions)
      .pipe(
        catchError(super.handleError<any>('logout'))
      )
  }
}
