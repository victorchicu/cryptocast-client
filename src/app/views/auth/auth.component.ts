import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignupService} from "../../services/signup/signup.service";
import {SignupRequestDto} from "../../services/signup/dto/signup-request-dto";
import {AuthRequestDto} from "../../services/auth/dto/auth-request-dto";
import {AuthService} from "../../services/auth/auth.service";
import {GlobalEnv} from "../../utils/global-env";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'oauth2-component',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  hidden: boolean = true;
  loading: boolean;
  authFormGroup: FormGroup;

  constructor(private readonly router: Router, private readonly authService: AuthService) {
    this.authFormGroup = new FormGroup({
      email: new FormControl(
        '', [Validators.required, Validators.email]
      ),
      password: new FormControl(
        '', [Validators.min(8), Validators.pattern("[A-Za-z0-9]+")]
      )
    })
  }

  auth(): void {
    this.loading = true;
    let authRequestDto: AuthRequestDto = new AuthRequestDto(
      this.authFormGroup.value.email,
      this.authFormGroup.value.password
    )
    this.authService.authorize(authRequestDto).subscribe((dto) => {
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
