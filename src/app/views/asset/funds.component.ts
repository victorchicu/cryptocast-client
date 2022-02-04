import {Component, OnInit} from '@angular/core';
import {FundsBalance} from "../../services/funds/models/funds-balance";
import {SubscriptionService} from "../../services/subscription/subscription.service";
import {FundsService} from "../../services/funds/funds.service";
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
  assetBalances: FundsBalance[] = [];

  constructor(
    private fundsService: FundsService,
    private rxStompService: RxStompService,
    private spinnerService: SpinnerService,
    private subscriptionService: SubscriptionService
  ) {
    //
  }

  private static toFundsBalance(source: FundsBalanceDto): FundsBalance {
    let asset: FundsBalance = new FundsBalance();
    asset.asset = source.asset;
    asset.fullName = source.fullName;
    asset.iconIndex = source.iconIndex;
    asset.flagged = source.flagged;
    asset.free = source.free;
    asset.frozen = source.frozen;
    asset.price = source.price.toFixed(2);
    asset.balance = source.balance.toFixed(2);
    asset.quotation = source.quotation;
    return asset;
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
      .subscribe((assets: FundsBalanceDto[]) => {
        if (assets) {
          this.assetBalances = assets!.map(FundsComponent.toFundsBalance)
          this.assetBalances.forEach((asset: FundsBalance) => {
            if (asset.flagged) {
              this.registerTickerEvent(asset);
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

  addSubscription(asset: FundsBalance) {
    console.log("FundsComponent::addSubscription BEGIN");
    this.subscriptionService.addSubscription(asset)
      .subscribe((subscription: SubscriptionDto) => {
        if (subscription) {
          asset.flagged = !asset.flagged;
          if (asset.flagged) {
            this.registerTickerEvent(asset);
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
          const assetDto: FundsBalanceDto = JSON.parse(message.body);
          FundsComponent.updateFundsBalance(assetDto, fundsBalance);
        }
      })
    console.log("FundsComponent::registerTickerEvent END");
  }
}
