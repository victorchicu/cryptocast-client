import {Component, OnInit} from '@angular/core';
import {GlobalEnv} from "./utils/global-env";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;

  ngOnInit(): void {
    let p = this.isDefined(localStorage.getItem(GlobalEnv.ACCESS_TOKEN));
    console.log(p)
    this.isLoggedIn = p;
  }

  isDefined<T>(value: T | undefined | null): value is T {
    return <T>value !== undefined && <T>value !== null;
  }
}
