import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Globals} from "../globals";
import {Injectable} from "@angular/core";

@Injectable()
export class OAuth2TokenHttpInterceptor implements HttpInterceptor {

  constructor() {
    //
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem(Globals.ACCESS_TOKEN);
    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    return next.handle(req);
  }

}
