import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignupService} from "../../services/signup/signup.service";
import {SignupRequestDto} from "../../services/signup/dto/signup-request-dto";
import {GlobalEnv} from "../../utils/global-env";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hidden: boolean = true;
  loading: boolean;
  returnUrl: string;
  signupFormGroup: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly signupService: SignupService
  ) {
    this.signupFormGroup = new FormGroup({
      email: new FormControl(
        '', [Validators.required, Validators.email]
      ),
      password: new FormControl(
        '', [Validators.min(8), Validators.pattern("[A-Za-z0-9]+")]
      )
    })
  }

  signup(): void {
    this.loading = true;
    let signupRequestDto: SignupRequestDto = new SignupRequestDto(
      this.signupFormGroup.value.email,
      this.signupFormGroup.value.password
    )
    this.signupService.signup(signupRequestDto)
      .subscribe((dto) => {
        localStorage.setItem(GlobalEnv.ACCESS_TOKEN, dto.accessToken);
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
