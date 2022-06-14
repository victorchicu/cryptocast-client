import { OrderService } from '../../../services/order.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Order } from '../../../shared/domain/order';
import { OrderRequestDto } from '../../../shared/dto/order-request-dto';

@Component({
  selector: 'app-order-confirm-dialog',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent implements OnInit {
  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: {
    //   title: string,
    //   subject: string,
    //   assetName: string,
    //   testOrder: Order
    // },
    // public dialogRef: MatDialogRef<ConfirmOrderComponent>,
    public orderService: OrderService,
  ) {
    //
  }

  ngOnInit(): void {
    // console.log(this.data);
  }

  createOrder(): void {
    // console.time("ConfirmOrderComponent::createOrder");
    // const orderRequestDto = this.toOrderRequestDto(this.data.assetName, this.data.testOrder);
    // this.orderService.createOrder(this.data.assetName, orderRequestDto)
    //   .subscribe(
    //     () => this.closeDialog(),
    //     (httpErrorResponse: HttpErrorResponse) => {
    //       console.log(httpErrorResponse);
    //       this.snackService.error(httpErrorResponse.error.errors[0].description);
    //       this.closeDialog();
    //     }, () => {
    //       console.timeEnd("ConfirmOrderComponent::createOrder");
    //     });
  }

  closeDialog(): void {
    // this.dialogRef.close();
  }


  private toOrderRequestDto(assetName: string, testOrder: Order) {
    return new OrderRequestDto(
      assetName,
      testOrder.side,
      testOrder.type,
      testOrder.price,
      testOrder.quantity
    );
  }
}
