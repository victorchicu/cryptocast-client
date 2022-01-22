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
  spinnerService: SpinnerService;
  spinnerSubscription: Subscription;

  constructor(spinnerService: SpinnerService) {
    this.spinnerService = spinnerService;
  }

  ngOnInit(): void {
    this.spinnerSubscription = this.spinnerService.subscribe(loading => {
      this.loading = loading;
    });
  }

  ngOnDestroy(): void {
    this.spinnerSubscription.unsubscribe();
  }

  isLoggedIn(): boolean {
    return Preconditions.isDefined(localStorage.getItem(Globals.ACCESS_TOKEN));
  }
}
