import {Component} from '@angular/core';
import {SignupService} from "../../services/signup.service";
import {SignupDto} from "../../shared/dto/signup-dto";
import {Router} from "@angular/router";
import {AccessTokenDto} from "../../shared/dto/access-token-dto";
import {Globals} from "../../shared/globals";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  email: string;
  password: string;

  constructor(private readonly router: Router, private readonly signupService: SignupService) {
    //
  }

  signup(): void {
    const signupDto: SignupDto = new SignupDto(this.email, this.password)
    this.signupService.signup(signupDto)
      .subscribe((accessTokenDto: AccessTokenDto) => {
        if (accessTokenDto) {
          localStorage.setItem(Globals.ACCESS_TOKEN, accessTokenDto.accessToken);
          this.router.navigateByUrl("/").finally(() => console.log("Navigate to home page after successful sign up"));
        }
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
      });
  }
}
