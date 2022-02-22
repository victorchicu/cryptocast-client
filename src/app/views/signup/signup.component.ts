import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SignupService} from "../../services/signup.service";
import {SignupDto} from "../../shared/dto/signup-dto";
import {Globals} from "../../shared/globals";
import {Router} from "@angular/router";
import {AccessTokenDto} from "../../shared/dto/access-token-dto";
import {LoadingIndicatorService} from "../../services/loading-indicator.service";
import {SnackService} from "../../services/snack.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hidden: boolean = true;
  signupForm: FormGroup;
  selected: string = 'BINANCE'

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snackService: SnackService,
    private signupService: SignupService,
    private loadingIndicatorService: LoadingIndicatorService
  ) {
    this.signupForm = this.formBuilder.group({
      email: new FormControl(
        null, [Validators.required, Validators.email]
      ),
      password: new FormControl(
        null, [Validators.minLength(8), Validators.maxLength(128)]
      ),
      apiKey: new FormControl(
        null, [Validators.required]
      ),
      secretKey: new FormControl(
        null, [Validators.required]
      ),
      exchangeProvider: new FormControl(
        null, [Validators.required]
      )
    })
  }

  get form() {
    return this.signupForm.controls;
  }

  signup(): void {
    let signupDto: SignupDto = new SignupDto(
      this.signupForm.value.email,
      this.signupForm.value.password,
      this.signupForm.value.apiKey,
      this.signupForm.value.secretKey,
      this.signupForm.value.exchangeProvider
    )
    this.loadingIndicatorService.setLoading(true)
    this.signupService.signup(signupDto)
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
