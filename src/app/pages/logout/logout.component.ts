import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LogoutService} from "../../services/logout-service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(
    private router: Router,
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
        }
      )
  }
}
