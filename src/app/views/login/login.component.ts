import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequestDto} from "../../shared/dto/login-request-dto";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {Globals} from "../../shared/globals";
import {AccessTokenDto} from "../../shared/dto/access-token-dto";
import {SubscriptionService} from "../../services/subscription.service";
import {SpinnerService} from "../../shared/services/spinner.service";

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
    private spinnerService: SpinnerService
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
    this.spinnerService.setLoading(true)
    this.loginService.login(authRequestDto)
      .subscribe((accessTokenDto: AccessTokenDto) => {
        if (accessTokenDto) {
          localStorage.setItem(Globals.ACCESS_TOKEN, accessTokenDto.accessToken);
          this.router.navigateByUrl("/");
        }
        this.spinnerService.setLoading(false)
      }, (error) => {
        this.spinnerService.setLoading(false)
      });
  }

  ngOnInit(): void {
    //
  }
}
