import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Globals} from "./shared/globals";
import {Preconditions} from "./shared/preconditions";
import {Subscription} from "rxjs";
import {SpinnerService} from "./shared/services/spinner.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  loading = false;
  subscription: Subscription;
  spinnerService: SpinnerService;

  constructor(spinnerService: SpinnerService) {
    this.spinnerService = spinnerService;
  }

  ngOnInit(): void {
    this.subscription = this.spinnerService.subscribe(loading => {
      setTimeout(() => this.loading = loading, 100);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isLoggedIn(): boolean {
    return Preconditions.isDefined(localStorage.getItem(Globals.ACCESS_TOKEN));
  }
}
