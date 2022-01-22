import {CanActivate, Router} from "@angular/router";
import {Globals} from "../globals";
import {Preconditions} from "../preconditions";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
    //
  }

  canActivate() {
    const isLoggedIn: boolean = Preconditions.isDefined(localStorage.getItem(Globals.ACCESS_TOKEN));
    if (!isLoggedIn) {
      this.router.navigateByUrl("/login");
    }
    return isLoggedIn;
  }

}
