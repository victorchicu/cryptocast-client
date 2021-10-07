import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalEnv} from "../utils/global-env";

export class OAuth2TokenHttpInterceptor implements HttpInterceptor {
  private readonly accessToken: string | null;

  constructor() {
    this.accessToken = localStorage.getItem(GlobalEnv.ACCESS_TOKEN);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.accessToken}`
        }
      });
    }
    return next.handle(req);
  }
}
