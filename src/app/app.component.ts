import {Component, OnInit} from '@angular/core';
import {RxStompService} from "@stomp/ng2-stompjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crypto-client';
}
