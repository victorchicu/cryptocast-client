import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LogoutService} from "../../services/logout/logout-service";
import {GlobalEnv} from "../../utils/global-env";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private readonly router: Router, private readonly logoutService: LogoutService) { }

  ngOnInit(): void {
    this.logoutService.logout();
    localStorage.removeItem(GlobalEnv.ACCESS_TOKEN);
    this.router.navigateByUrl("/");
  }

}
