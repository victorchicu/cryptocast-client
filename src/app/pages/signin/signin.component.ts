import {Component, OnInit} from '@angular/core';
import {SigninDto} from "../../shared/dto/signin-dto";
import {SignInService} from "../../services/sign-in.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Globals} from "../../shared/globals";
import {AccessTokenDto} from "../../shared/dto/access-token-dto";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'signin-component',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  email: string;
  password: string;

  constructor(private readonly router: Router, private readonly signinService: SignInService) {
    //
  }

  ngOnInit(): void {
    //
  }

  signIn(): void {
    const signinDto: SigninDto = new SigninDto(this.email, this.password)
    this.signinService.signin(signinDto)
      .subscribe((accessTokenDto: AccessTokenDto) => {
        if (accessTokenDto) {
          localStorage.setItem(Globals.ACCESS_TOKEN, accessTokenDto.accessToken);
          this.router.navigateByUrl('/')
            .finally(() => {
              console.log("Navigate to home page after successful sign in")
            });
        }
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
      });
  }

  signInByProvider(provider: string) {
    window.location.href = 'http://localhost:4200/oauth2/authorize/' + provider + '?redirect_uri=http://localhost:4200/%23/oauth2/redirect'
  }
}
