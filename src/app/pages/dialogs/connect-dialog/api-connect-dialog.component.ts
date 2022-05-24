import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiConnectionService} from "../../../services/api-connection.service";
import {ApiKeyDto} from "../../../shared/dto/api-key-dto";
import {Exchange} from "../../../shared/enums/exchange";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-connect-dialog',
  templateUrl: './api-connect-dialog.component.html',
  styleUrls: ['./api-connect-dialog.component.scss']
})
export class ApiConnectDialogComponent implements OnInit {
  label: string;
  apiKey: string;
  secretKey: string;
  exchanges: any[] = [{name: Exchange.BINANCE}, {name: Exchange.GATE}];
  selectedExchange: any;
  @Input() display: boolean;
  @Output() eventEmitter = new EventEmitter();

  constructor(private readonly apiConnectionService: ApiConnectionService) {
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
      this.selectedExchange.name as Exchange
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
