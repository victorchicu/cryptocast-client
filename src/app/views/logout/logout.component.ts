import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LogoutService} from "../../services/logout/logout-service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private readonly router: Router, private readonly logoutService: LogoutService) {
    //
  }

  ngOnInit(): void {
    this.logoutService.logout()
      .subscribe(() => this.router.navigateByUrl("/"));
  }

}
