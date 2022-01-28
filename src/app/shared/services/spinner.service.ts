import {Injectable} from "@angular/core";
import {Subject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private subject: Subject<boolean>

  constructor() {
    this.subject = new Subject<boolean>();
  }

  subscribe(next: (value: boolean) => void): Subscription {
    return this.subject.subscribe(next)
  }

  setLoading(loading: boolean) {
    this.subject.next(loading);
  }
}
