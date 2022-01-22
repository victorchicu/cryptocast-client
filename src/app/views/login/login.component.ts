import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequestDto} from "../../shared/dto/login-request-dto";
import {LoginService} from "../../services/login/login.service";
import {Router} from "@angular/router";
import {Globals} from "../../shared/globals";
import {AccessTokenDto} from "../../shared/dto/access-token-dto";

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hidden: boolean = true;
  loading: boolean;
  loginForm: FormGroup;
  selected: string = 'BINANCE'

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginService
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
    this.loading = true;
    let authRequestDto: LoginRequestDto = new LoginRequestDto(
      this.loginForm.value.email,
      this.loginForm.value.password,
      this.loginForm.value.exchangeProvider
    )
    this.loginService.login(authRequestDto)
      .subscribe((accessTokenDto: AccessTokenDto) => {
        localStorage.setItem(Globals.ACCESS_TOKEN, accessTokenDto.accessToken);
        this.router.navigateByUrl("/");
        this.loading = false;
      }, (error) => {
        this.loading = false;
      });
  }

  ngOnInit(): void {
    //
  }
}
