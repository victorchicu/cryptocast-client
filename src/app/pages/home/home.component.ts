import {Component, OnInit} from '@angular/core';
import {Asset} from "../../shared/domain/asset";
import {AssetService} from "../../services/asset.service";
import {HttpErrorResponse, HttpParams} from "@angular/common/http";
import {AssetDto} from "../../shared/dto/asset-dto";
import {Exchange} from "../../shared/enums/exchange";
import {ConfirmationService} from "primeng/api";
import {ApiConnectionService} from "../../services/api-connection.service";
import {ActivatedRoute} from "@angular/router";

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
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiConnectService: ApiConnectionService,
    private readonly confirmationService: ConfirmationService
  ) {
    //
  }

  ngOnInit(): void {
    const httpParams = new HttpParams();
    this.fetchListAssets(httpParams);
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

  onOpenDialog() {
    this.display = true;
  }

  onCloseDialog(display: any) {
    this.display = display;
    this.fetchListAssets(new HttpParams());
  }

  handleDeleteExchange($event: any, label: string) {
    this.confirmationService.confirm({
      target: $event.target,
      message: `Are you sure you want to delete ${label}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.time("HomeComponent::onExchangeDelete")
        this.apiConnectService.delete(label)
          .subscribe(
            () => this.assets = this.assets.filter(obj => !obj.apiKeyName.includes(label)),
            (error: HttpErrorResponse) => console.error(error),
            () => console.time("HomeComponent::onExchangeDelete"))
      },
      reject: () => {
        //reject action
      }
    });
  }

  private fetchListAssets(httpParams: HttpParams) {
    this.assetService.listAssets(httpParams)
      .subscribe((assets: AssetDto[]) => {
        this.assets = assets!.map(value => this.toAsset(value));
      });
  }
}
