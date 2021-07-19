import { Component, OnInit } from '@angular/core';
import {RxStompService} from "@stomp/ng2-stompjs";
import {Message} from "@stomp/stompjs"
import {Subscription} from "rxjs";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  public notifications: string[] = [];
  private topicSubscription: Subscription;

  constructor(private rxStompService: RxStompService) {
  }

  onClick() {
    const jsonString: string = JSON.stringify({
      "type": "greetings",
      "payload": {
        "prop_1": "1",
        "prop_2": "2"
      }
    });
    console.log(jsonString);
    this.rxStompService.publish({destination: "/app/notify", body: jsonString});
  }

  ngOnInit(): void {
    this.topicSubscription = this.rxStompService
      .watch("/topic/greetings")
      .subscribe((message: Message) => {
        console.log(message);
        this.notifications.push(message.body);
      })
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }
}
