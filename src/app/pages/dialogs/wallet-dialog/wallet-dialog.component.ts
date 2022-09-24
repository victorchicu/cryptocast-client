import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WalletService} from "../../../services/wallet.service";
import {WalletDto} from "../../../shared/dto/wallet-dto";
import {Exchange} from "../../../shared/enums/exchange";
import {HttpErrorResponse} from "@angular/common/http";
import {WalletCreateEvent} from "../../../shared/domain/wallet-create-event";
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
  exchanges: any[] = [{name: Exchange.BINANCE}, {name: Exchange.GATE}];
  selectedExchange: any;
  @Input() display: boolean;
  @Output() closeDialog = new EventEmitter<WalletCreateEvent>();

  constructor(private readonly apiManagementService: WalletService) {
    //
  }

  onClose() {
    console.log("Close dialog from child");
    this.closeDialog.emit(WalletCreateEvent.create(new ApiKey(this.label), false));
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
      this.selectedExchange.name as Exchange
    );
    this.apiManagementService.create(apiKey)
      .subscribe(
        () => {
          this.closeDialog.emit(WalletCreateEvent.create(new ApiKey(this.label), false));
        },
        (error: HttpErrorResponse) => console.error(error)
      );
  }
}
