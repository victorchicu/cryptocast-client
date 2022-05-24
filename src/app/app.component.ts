import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router} from "@angular/router";
import {Globals} from "./shared/globals";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dropdown: MenuItem[];

  constructor(private  readonly router: Router) {
    //
  }

  ngOnInit(): void {
    this.dropdown = [
      {
        label: "Account",
        items: [{
          label: 'My Exchanges',
          icon: 'pi pi-briefcase',
          command: () => {
            this.router.navigate(['/my-exchanges'])
              .finally(() => {
                console.log("Log out")
              })
          }
        }]
      },
      {
        separator: true,
        items: [
          {
            label: 'Log Out',
            icon: 'pi pi-power-off',
            command: () => {
              this.router.navigate(['/logout'])
                .finally(() => {
                  console.log("Log out")
                })
            }
          }
        ]
      }]
  }

  isLoggedIn() {
    return localStorage.getItem(Globals.ACCESS_TOKEN);
  }
}
