import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExchangeConnectService} from "../../../services/exchange-connect.service";
import {ApiKeyDto} from "../../../shared/dto/api-key-dto";
import {ExchangeType} from "../../../shared/enums/exchangeType";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'connect-dialog',
  templateUrl: './connect-dialog.component.html',
  styleUrls: ['./connect-dialog.component.scss']
})
export class ConnectDialogComponent implements OnInit {
  label: string;
  apiKey: string;
  secretKey: string;
  exchanges: any[] = [{name: ExchangeType.BINANCE}, {name: ExchangeType.GATE}];
  selectedExchange: any;
  @Input() display: boolean;
  @Output() eventEmitter = new EventEmitter();

  constructor(private readonly apiConnectionService: ExchangeConnectService) {
    //
  }

  onClose() {
    this.eventEmitter.emit(false);
  }

  ngOnInit(): void {
    //
  }

  ngOnDestroy() {
    this.eventEmitter.unsubscribe();
  }

  handleConnect() {
    let apiKey = new ApiKeyDto(
      this.label,
      this.apiKey,
      this.secretKey,
      this.selectedExchange.name as ExchangeType
    );
    this.apiConnectionService.create(apiKey)
      .subscribe(this.handleOk(), this.handleError(), this.handleComplete());
  }

  private handleOk() {
    return () => {
      console.log('ApiConnectDialogComponent')
      //
    };
  }

  private handleError() {
    return (error: HttpErrorResponse) => console.error(error);
  }

  private handleComplete() {
    return () => {
      this.onClose();
    };
  }
}
