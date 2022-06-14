import {Component, OnInit} from '@angular/core';
import {Asset} from "../../shared/domain/asset";
import {ExchangeAssetsService} from "../../services/exchange-assets.service";
import {HttpParams} from "@angular/common/http";
import {AssetDto} from "../../shared/dto/asset-dto";
import {ExchangeType} from "../../shared/enums/exchangeType";
import {ConfirmationService} from "primeng/api";
import {ExchangeConnectService} from "../../services/exchange-connect.service";
import {ExchangeDto} from "../../shared/dto/exchange-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ConfirmationService]
})
export class HomeComponent implements OnInit {
  display: boolean;
  exchanges: ExchangeDto[] = [];

  constructor(
    private readonly router: Router,
    private readonly assetService: ExchangeAssetsService,
    private readonly exchangeConnectService: ExchangeConnectService
  ) {
    //
  }

  ngOnInit(): void {
    const httpParams = new HttpParams();
    this.fetchExchanges(httpParams);
  }

  openExchange(label: string) {
    this.router.navigate(['/assets'], {queryParams: {'exchange': label}})
      .finally(() => {
        console.log("Go to exchange assets")
      })
  }

  onOpenDialog() {
    this.display = true;
  }

  onCloseDialog(display: any) {
    this.display = display;
  }

  private fetchExchanges(httpParams: HttpParams) {
    this.exchangeConnectService.list()
      .subscribe((value: ExchangeDto[]) => {
        this.exchanges = value;
      })
  }
}
