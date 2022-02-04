import {Component, OnInit} from '@angular/core';
import {FundsBalance} from "../../shared/domain/funds-balance";
import {SubscriptionService} from "../../services/subscription.service";
import {FundsService} from "../../services/funds.service";
import {HttpParams} from "@angular/common/http";
import {FundsBalanceDto} from "../../shared/dto/funds-balance-dto";
import {SubscriptionDto} from "../../shared/dto/subscription-dto";
import {RxStompService} from "@stomp/ng2-stompjs";
import {Message} from "@stomp/stompjs";
import {SpinnerService} from "../../shared/services/spinner.service";

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss']
})
export class FundsComponent implements OnInit {
  fundsBalances: FundsBalance[] = [];

  constructor(
    private fundsService: FundsService,
    private rxStompService: RxStompService,
    private spinnerService: SpinnerService,
    private subscriptionService: SubscriptionService
  ) {
    //
  }

  private static toFundsBalance(source: FundsBalanceDto): FundsBalance {
    const fundsBalance: FundsBalance = new FundsBalance();
    fundsBalance.asset = source.asset;
    fundsBalance.fullName = source.fullName;
    fundsBalance.iconIndex = source.iconIndex;
    fundsBalance.flagged = source.flagged;
    fundsBalance.free = source.free;
    fundsBalance.frozen = source.frozen;
    fundsBalance.price = source.price.toFixed(2);
    fundsBalance.balance = source.balance.toFixed(2);
    fundsBalance.quotation = source.quotation;
    return fundsBalance;
  }

  private static updateFundsBalance(source: FundsBalanceDto, target: FundsBalance) {
    target.free = source.free;
    target.frozen = source.frozen;
    target.price = source.price.toFixed(2);
    target.balance = source.balance.toFixed(2);
    target.quotation = source.quotation;
  }

  ngOnInit(): void {
    const params = new HttpParams()
    // .set('page', 0)
    // .set('size', this.pageSize);
    this.listFundsBalances(params)
  }

  listFundsBalances(httpParams: HttpParams) {
    console.log("FundsComponent::listFundsBalances BEGIN");
    this.spinnerService.setLoading(true);
    this.fundsService.listFundsBalances(httpParams)
      .subscribe((fundsBalances: FundsBalanceDto[]) => {
        if (fundsBalances) {
          this.fundsBalances = fundsBalances!.map(FundsComponent.toFundsBalance)
          this.fundsBalances.forEach((fundsBalance: FundsBalance) => {
            if (fundsBalance.flagged) {
              this.registerTickerEvent(fundsBalance);
            }
          });
        }
        this.spinnerService.setLoading(false);
      }, error => {
        console.log(error)
        this.spinnerService.setLoading(false);
      })
    console.log("FundsComponent::listFundsBalances END");
  }

  addSubscription(fundsBalance: FundsBalance) {
    console.log("FundsComponent::addSubscription BEGIN");
    this.subscriptionService.addSubscription(fundsBalance)
      .subscribe((subscription: SubscriptionDto) => {
        if (subscription) {
          fundsBalance.flagged = !fundsBalance.flagged;
          if (fundsBalance.flagged) {
            this.registerTickerEvent(fundsBalance);
          }
        }
      }, error => {
        console.log(error)
      });
    console.log("FundsComponent::addSubscription END");
  }

  registerTickerEvent(fundsBalance: FundsBalance) {
    console.log("FundsComponent::registerTickerEvent BEGIN");
    const topic = `/topic/${fundsBalance.asset}-ticker`;
    this.rxStompService
      .watch(topic)
      .subscribe((message: Message) => {
        if (message) {
          const fundsBalanceDto: FundsBalanceDto = JSON.parse(message.body);
          FundsComponent.updateFundsBalance(fundsBalanceDto, fundsBalance);
        }
      })
    console.log("FundsComponent::registerTickerEvent END");
  }
}
