import { Component, OnInit } from '@angular/core';
import {AssetBalance} from "../../../shared/domain/asset-balance";
import {HttpParams} from "@angular/common/http";
import {WalletsOverviewService} from "../../../services/wallets-overview.service";
import {AssetBalanceDto} from "../../../shared/dto/asset-balance-dto";
import {ExchangeType} from "../../../shared/enums/exchangeType";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-assets',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  assetBalances: AssetBalance[] = []

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly walletsOverviewService: WalletsOverviewService
  ) {
    //
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const label = params['label'];
      this.fetchWallet(label, new HttpParams())
    });
  }

  private fetchWallet(label: string, httpParams: HttpParams) {
    this.walletsOverviewService.list(label, httpParams)
      .subscribe((source: AssetBalanceDto[]) => {
        this.assetBalances = source.map((value: AssetBalanceDto): AssetBalance => this.toAsset(value));
      })
  }

  private toAsset(assetDto: AssetBalanceDto): AssetBalance {
    let asset: AssetBalance = new AssetBalance();
    asset.name = assetDto.name;
    asset.fullName = assetDto.fullName;
    asset.exchange = assetDto.exchange as ExchangeType;
    asset.totalFunds = assetDto.totalFunds;
    asset.fundsAvailable = assetDto.fundsAvailable;
    asset.usedInAnyOutstandingOrders = assetDto.usedInAnyOutstandingOrders;
    return asset;
  }
}
