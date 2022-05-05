import {Component, OnInit} from '@angular/core';
import {SigninDto} from "../../shared/dto/signin-dto";
import {SigninService} from "../../services/signin.service";
import {Router} from "@angular/router";
import {Globals} from "../../shared/globals";
import {AccessTokenDto} from "../../shared/dto/access-token-dto";
import {HttpErrorResponse} from "@angular/common/http";
import {ExchangeProvider} from "../../shared/enums/exchange-provider";

@Component({
  selector: 'signin-component',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  email: string;
  password: string;
  selected: string = 'BINANCE'

  constructor(
    private router: Router,
    private signinService: SigninService
  ) {
    //
  }

  signin($event: any): void {
    let signinRequestDto: SigninDto = new SigninDto(
      this.email,
      this.password,
      ExchangeProvider.BINANCE
    )
    console.log(signinRequestDto);
    this.signinService.signin(signinRequestDto)
      .subscribe((accessTokenDto: AccessTokenDto) => {
        if (accessTokenDto) {
          localStorage.setItem(Globals.ACCESS_TOKEN, accessTokenDto.accessToken);
          this.router.navigate(['/'])
            .finally(() => {
              console.log("Navigate to home page after successful sign in")
            });
        }
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
      });
  }

  ngOnInit(): void {
    //
  }
}
