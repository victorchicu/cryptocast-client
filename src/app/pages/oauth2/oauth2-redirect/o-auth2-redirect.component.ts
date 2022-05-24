import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Globals} from "../../../shared/globals";
import {SigninService} from "../../../services/signin.service";

@Component({
  selector: 'app-oauth2-redirect',
  templateUrl: './o-auth2-redirect.component.html',
  styleUrls: ['./o-auth2-redirect.component.scss']
})
export class OAuth2RedirectComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly signinService: SigninService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    //
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const token = params['token'];
      localStorage.setItem(Globals.ACCESS_TOKEN, token);
      this.router.navigate(["/"]).then(() => console.log('Navigate to home page'))
    });
  }
}
