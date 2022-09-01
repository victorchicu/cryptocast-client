import {CanActivate, Router} from "@angular/router";
import {Globals} from "../globals";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
    //
  }

  canActivate() {
    const accessToken: string | null = localStorage.getItem(Globals.ACCESS_TOKEN);
    const isLoggedIn = !this.isEmpty(accessToken);
    if (!isLoggedIn) {
      this.router.navigateByUrl("/signin");
    }
    return isLoggedIn;
  }

  isEmpty(str: string | null) {
    return (!str || str.length === 0);
  }
}
