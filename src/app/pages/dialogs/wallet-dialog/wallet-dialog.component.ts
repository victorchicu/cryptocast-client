import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WalletService} from "../../../services/wallet.service";
import {WalletDto} from "../../../shared/dto/wallet-dto";
import {ExchangeType} from "../../../shared/enums/exchangeType";
import {HttpErrorResponse} from "@angular/common/http";
import {ApiKeyCreateEvent} from "../../../shared/domain/api-key-create-event";
import { ApiKey } from 'src/app/shared/domain/api-key';

@Component({
  selector: 'api-management-dialog',
  templateUrl: './wallet-dialog.component.html',
  styleUrls: ['./wallet-dialog.component.scss']
})
export class WalletDialogComponent implements OnInit {
  label: string;
  apiKey: string;
  secretKey: string;
  exchanges: any[] = [{name: ExchangeType.BINANCE}, {name: ExchangeType.GATE}];
  selectedExchange: any;
  @Input() display: boolean;
  @Output() closeDialog = new EventEmitter<ApiKeyCreateEvent>();

  constructor(private readonly apiManagementService: WalletService) {
    //
  }

  onClose() {
    console.log("Close dialog from child");
    this.closeDialog.emit(ApiKeyCreateEvent.create(new ApiKey(this.label), false));
  }

  ngOnInit(): void {
    //TODO: Fetch available exchanges from server
  }

  ngOnDestroy() {
    console.log("Destroy dialog from child");
    this.closeDialog.unsubscribe();
  }

  onApiKeyCreate() {
    let apiKey = new WalletDto(
      this.label,
      this.apiKey,
      this.secretKey,
      this.selectedExchange.name as ExchangeType
    );
    this.apiManagementService.create(apiKey)
      .subscribe(
        () => {
          this.closeDialog.emit(ApiKeyCreateEvent.create(new ApiKey(this.label), false));
        },
        (error: HttpErrorResponse) => console.error(error)
      );
  }
}
