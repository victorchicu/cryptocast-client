import {Component, OnInit} from '@angular/core';
import {Asset} from "../../shared/domain/asset";
import {AssetService} from "../../services/asset.service";
import {HttpParams} from "@angular/common/http";
import {AssetDto} from "../../shared/dto/asset-dto";
import {Exchange} from "../../shared/enums/exchange";
import {ConfirmationService} from "primeng/api";
import {ExchangeService} from "../../services/exchange.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ConfirmationService]
})
export class HomeComponent implements OnInit {
  assets: Asset[] = [];
  display: boolean;

  constructor(
    private readonly assetService: AssetService,
    private readonly exchangeService: ExchangeService,
    private readonly confirmationService: ConfirmationService
  ) {
    //
  }

  ngOnInit(): void {
    const httpParams = new HttpParams();
    this.assetService.listAssets(httpParams)
      .subscribe((assets: AssetDto[]) => {
        this.assets = assets!.map(value => this.toAsset(value));
      });
  }

  toAsset(assetDto: AssetDto): Asset {
    let asset: Asset = new Asset();
    asset.name = assetDto.name;
    asset.fullName = assetDto.fullName;
    asset.apiKeyName = assetDto.apiKeyName;
    asset.exchange = assetDto.exchange as Exchange;
    asset.totalFunds = assetDto.totalFunds;
    asset.fundsAvailable = assetDto.fundsAvailable;
    asset.usedInAnyOutstandingOrders = assetDto.usedInAnyOutstandingOrders;
    return asset;
  }

  showDialog() {
    this.display = true;
  }

  onDialogClose(event: any) {
    this.display = event;
  }

  onExchangeDelete($event: any, apiKeyName: string) {
    this.confirmationService.confirm({
      target: $event.target,
      message: `Are you sure you want to delete ${apiKeyName}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.exchangeService.deleteApiKey(apiKeyName)
          .subscribe(() => {
            this.assets = this.assets.filter(obj => !obj.apiKeyName.includes(apiKeyName));
          })
      },
      reject: () => {
        //reject action
      }
    });

  }
}
