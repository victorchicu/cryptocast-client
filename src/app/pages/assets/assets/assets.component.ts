import { Component, OnInit } from '@angular/core';
import {Asset} from "../../../shared/domain/asset";
import {HttpParams} from "@angular/common/http";
import {ExchangeDto} from "../../../shared/dto/exchange-dto";
import {ExchangeAssetsService} from "../../../services/exchange-assets.service";
import {AssetDto} from "../../../shared/dto/asset-dto";
import {ExchangeType} from "../../../shared/enums/exchangeType";
import {ActivatedRoute} from "@angular/router";
import {Globals} from "../../../shared/globals";

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  assets: Asset[] = []

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly exchangeAssetsService: ExchangeAssetsService
  ) {
    //
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const exchange = params['exchange'];
      this.fetchExchangeAssets(exchange, new HttpParams())
    });
  }

  private fetchExchangeAssets(exchange: string, httpParams: HttpParams) {
    this.exchangeAssetsService.list(exchange, httpParams)
      .subscribe((assets: AssetDto[]) => {
        this.assets = assets.map((value: AssetDto): Asset => this.toAsset(value));
      })
  }

  private toAsset(assetDto: AssetDto): Asset {
    let asset: Asset = new Asset();
    asset.name = assetDto.name;
    asset.fullName = assetDto.fullName;
    asset.exchange = assetDto.exchange as ExchangeType;
    asset.totalFunds = assetDto.totalFunds;
    asset.fundsAvailable = assetDto.fundsAvailable;
    asset.usedInAnyOutstandingOrders = assetDto.usedInAnyOutstandingOrders;
    return asset;
  }
}
