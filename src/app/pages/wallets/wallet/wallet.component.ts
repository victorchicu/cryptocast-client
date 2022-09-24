import { Component, OnInit } from '@angular/core';
import {WalletBalance} from "../../../shared/domain/wallet-balance";
import {HttpParams} from "@angular/common/http";
import {WalletsService} from "../../../services/wallets.service";
import {WalletBalanceDto} from "../../../shared/dto/wallet-balance-dto";
import {Exchange} from "../../../shared/enums/exchange";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-assets',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  walletBalances: WalletBalance[] = []

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly walletsOverviewService: WalletsService
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
      .subscribe((source: WalletBalanceDto[]) => {
        this.walletBalances = source.map((value: WalletBalanceDto): WalletBalance => this.toAsset(value));
      })
  }

  private toAsset(assetDto: WalletBalanceDto): WalletBalance {
    let asset: WalletBalance = new WalletBalance();
    asset.name = assetDto.name;
    asset.fullName = assetDto.fullName;
    asset.exchange = assetDto.exchange as Exchange;
    asset.totalFunds = assetDto.totalFunds;
    asset.fundsAvailable = assetDto.fundsAvailable;
    asset.usedInAnyOutstandingOrders = assetDto.usedInAnyOutstandingOrders;
    return asset;
  }
}
