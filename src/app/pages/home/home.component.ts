import {Component, OnInit} from '@angular/core';
import {Asset} from "../../shared/domain/asset";
import {AssetService} from "../../services/asset.service";
import {HttpParams} from "@angular/common/http";
import {AssetDto} from "../../shared/dto/asset-dto";
import {ExchangeProvider} from "../../shared/enums/exchange-provider";
import {ConfirmationService} from "primeng/api";
import {ProductService} from "../../services/product.service";
import {Product} from "../../shared/domain/product";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ConfirmationService]
})
export class HomeComponent implements OnInit {
  assets: Asset[] = [];
  exchanges: any[] = [{
    name: "Binance"
  }];
  selectedExchange: any;
  isExchangeShown: boolean;
  products: Product[];
  selectedProduct: Product;

  constructor(private readonly assetService: AssetService, private readonly productService: ProductService) {
    //
  }

  ngOnInit(): void {
    const httpParams = new HttpParams();
    // .set('assets', this.selectedChips.map(value => value.name).join(","))
    this.assetService.listAssets(httpParams)
      .subscribe((assets: AssetDto[]) => {
        this.assets = assets!.map(value => this.toAsset(value));
      });
    this.productService.getProductsSmall().then(products => this.products = products);
  }

  toAsset(assetDto: AssetDto): Asset {
    let asset: Asset = new Asset();
    asset.name = assetDto.name;
    asset.fullName = assetDto.fullName;
    asset.provider = assetDto.provider as ExchangeProvider;
    asset.totalFunds = assetDto.totalFunds;
    asset.fundsAvailable = assetDto.fundsAvailable;
    asset.usedInAnyOutstandingOrders = assetDto.usedInAnyOutstandingOrders;
    return asset;
  }

  openExchangeDialog() {
    this.isExchangeShown = !this.isExchangeShown;
  }
}
