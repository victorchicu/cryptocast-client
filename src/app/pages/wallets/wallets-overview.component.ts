import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from "primeng/api";
import {ApiManagementService} from "../../services/api-management.service";
import {Router} from "@angular/router";
import {ApiKeyDto} from "../../shared/dto/api-key-dto";
import {ApiKeyCreateEvent} from "../../shared/domain/api-key-create-event";

@Component({
  selector: 'home',
  templateUrl: './wallets-overview.component.html',
  styleUrls: ['./wallets-overview.component.scss'],
  providers: [ConfirmationService]
})
export class WalletsOverviewComponent implements OnInit {
  apiKeys: ApiKeyDto[] = [];
  isOpened: boolean;

  constructor(private readonly router: Router, private readonly apiManagementService: ApiManagementService) {
    //
  }

  ngOnInit(): void {
    this.fetchApiKeys();
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
    this.fetchApiKeys();
  }

  private fetchApiKeys() {
    this.apiManagementService.list()
      .subscribe((value: ApiKeyDto[]) => {
        this.apiKeys = value;
      })
  }
}
