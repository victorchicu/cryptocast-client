import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequestDto} from "../../shared/dto/login-request-dto";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {Globals} from "../../shared/globals";
import {AccessTokenDto} from "../../shared/dto/access-token-dto";
import {AssetTrackerService} from "../../services/asset-tracker.service";
import {LoadingIndicatorService} from "../../services/loading-indicator.service";
import {SnackService} from "../../services/snack.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hidden: boolean = true;
  loginForm: FormGroup;
  selected: string = 'BINANCE'

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackService: SnackService,
    private loadingIndicatorService: LoadingIndicatorService
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        null,
        [Validators.required, Validators.email]
      ),
      password: new FormControl(
        null,
        [Validators.minLength(8), Validators.maxLength(128)]
      ),
      exchangeProvider: new FormControl(
        null,
        [Validators.required]
      )
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  hide(e: any) {
    this.hidden = !this.hidden;
  }

  login(): void {
    let authRequestDto: LoginRequestDto = new LoginRequestDto(
      this.loginForm.value.email,
      this.loginForm.value.password,
      this.loginForm.value.exchangeProvider
    )
    this.loadingIndicatorService.setLoading(true)
    this.loginService.login(authRequestDto)
      .subscribe((accessTokenDto: AccessTokenDto) => {
        if (accessTokenDto) {
          localStorage.setItem(Globals.ACCESS_TOKEN, accessTokenDto.accessToken);
          this.router.navigateByUrl("/");
        }
        this.loadingIndicatorService.setLoading(false)
      }, (httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.snackService.error(httpErrorResponse.error.errors[0].description);
        this.loadingIndicatorService.setLoading(false)
      });
  }

  ngOnInit(): void {
    //
  }
}
