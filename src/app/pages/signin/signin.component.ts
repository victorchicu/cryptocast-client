import {Component, OnInit} from '@angular/core';
import {SigninDto} from "../../shared/dto/signin-dto";
import {SigninService} from "../../services/signin.service";
import {Router} from "@angular/router";
import {Globals} from "../../shared/globals";
import {AccessTokenDto} from "../../shared/dto/access-token-dto";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";

@Component({
  selector: 'signin-component',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  email: string;
  password: string;

  constructor(
    private readonly router: Router,
    private readonly signinService: SigninService
  ) {
    //
  }

  signin(): void {
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
}
