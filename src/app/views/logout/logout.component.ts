import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LogoutService} from "../../services/logout-service";
import {LoadingIndicatorService} from "../../services/loading-indicator.service";
import {SnackService} from "../../services/snack.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(
    private router: Router,
    private snackService: SnackService,
  private logoutService: LogoutService
  ) {
    //
  }

  ngOnInit(): void {
    this.logoutService.logout()
      .subscribe(
        () => this.router.navigateByUrl("/"),
        (httpErrorResponse: HttpErrorResponse) => {
          console.log(httpErrorResponse);
          this.snackService.error(httpErrorResponse.error.errors[0].description);
        }
      )
  }
}
