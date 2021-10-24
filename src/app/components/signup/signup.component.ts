import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SignupService} from "../../services/signup/signup.service";
import {SignupRequestDto} from "../../services/signup/dto/signup-request-dto";
import {Globals} from "../../shared/globals";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hidden: boolean = true;
  loading: boolean;
  signupForm: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly signupService: SignupService
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
      )
    })
  }

  get form() {
    return this.signupForm.controls;
  }

  signup(): void {
    this.loading = true;
    let signupRequestDto: SignupRequestDto = new SignupRequestDto(
      this.signupForm.value.email,
      this.signupForm.value.password,
      this.signupForm.value.apiKey,
      this.signupForm.value.secretKey
    )
    this.signupService.signup(signupRequestDto)
      .subscribe((dto) => {
        localStorage.setItem(Globals.ACCESS_TOKEN, dto.accessToken);
        this.router.navigateByUrl("/");
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      });
  }

  ngOnInit(): void {
    //
  }
}
