import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Globals} from "./shared/globals";
import {Preconditions} from "./shared/preconditions";
import {Subscription} from "rxjs";
import {LoadingIndicatorService} from "./services/loading-indicator.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  loading = false;
  subscription: Subscription;
  loadingIndicatorService: LoadingIndicatorService;

  constructor(loadingIndicatorService: LoadingIndicatorService) {
    this.loadingIndicatorService = loadingIndicatorService;
  }

  ngOnInit(): void {
    this.subscription = this.loadingIndicatorService.subscribe(loading => {
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
