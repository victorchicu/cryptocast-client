import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {WalletService} from "../../services/wallet.service";
import {Router} from "@angular/router";
import {WalletDto} from "../../shared/dto/wallet-dto";
import {ApiKeyCreateEvent} from "../../shared/domain/api-key-create-event";

@Component({
  selector: 'home',
  templateUrl: './wallets-overview.component.html',
  styleUrls: ['./wallets-overview.component.scss'],
  providers: [ConfirmationService]
})
export class WalletsOverviewComponent implements OnInit {
  wallets: WalletDto[] = [];
  isOpened: boolean;

  constructor(private readonly router: Router, private readonly walletService: WalletService) {
    //
  }

  ngOnInit(): void {
    this.fetchWallets();
  }

  openWallet(label: string) {
    this.router.navigate(['/wallet-balance'], {queryParams: {'label': label}})
      .finally(() => {
        console.log("Go to wallet " + label)
      })
  }

  onOpenDialog() {
    this.isOpened = true;
  }

  onCloseDialog() {
    console.log("Close dialog from parent");
    this.isOpened = false;
    // this.apiKeys.push(new ApiKeyDto(apiKeyCreateEvent.apiKey?.label, null, null, null))
    this.fetchWallets();
  }

  private fetchWallets() {
    this.walletService.list()
      .subscribe((value: WalletDto[]) => {
        this.wallets = value;
      })
  }
}
