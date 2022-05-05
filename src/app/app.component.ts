import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Globals} from "./shared/globals";
import {Preconditions} from "./shared/preconditions";
import {MenuItem} from 'primeng/api';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dropdown: MenuItem[];

  constructor(public router: Router) {
    //
  }

  ngOnInit(): void {
    this.dropdown = [
      {
        label: "Account",
        items: [{
          label: 'Subscriptions',
          icon: 'pi pi-star',
          command: () => {
            this.router.navigate(['/logout'])
              .finally(() => {
                console.log("User logged out")
              })
          }
        }]
      },
      {
        separator: true
      },
      {
        items: [
          {
            label: 'Log Out',
            icon: 'pi pi-power-off',
            command: () => {
              // this.update();
            },
            tooltipOptions: {
              disabled: true
            }
          }
        ]
      }]
  }

  isLoggedIn(): boolean {
    return Preconditions.isDefined(localStorage.getItem(Globals.ACCESS_TOKEN));
  }
}
