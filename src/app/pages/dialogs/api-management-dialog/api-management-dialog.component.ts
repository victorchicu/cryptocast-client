import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiManagementService} from "../../../services/api-management.service";
import {ApiKeyDto} from "../../../shared/dto/api-key-dto";
import {ExchangeType} from "../../../shared/enums/exchangeType";
import {HttpErrorResponse} from "@angular/common/http";
import {ApiKeyCreateEvent} from "../../../shared/domain/api-key-create-event";
import { ApiKey } from 'src/app/shared/domain/api-key';

@Component({
  selector: 'api-management-dialog',
  templateUrl: './api-management-dialog.component.html',
  styleUrls: ['./api-management-dialog.component.scss']
})
export class ApiManagementDialogComponent implements OnInit {
  label: string;
  apiKey: string;
  secretKey: string;
  exchanges: any[] = [{name: ExchangeType.BINANCE}, {name: ExchangeType.GATE}];
  selectedExchange: any;
  @Input() display: boolean;
  @Output() closeDialog = new EventEmitter<ApiKeyCreateEvent>();

  constructor(private readonly apiManagementService: ApiManagementService) {
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
    let apiKey = new ApiKeyDto(
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
