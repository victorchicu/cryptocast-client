import { OrderService } from '../../../services/order.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TestOrder } from '../../../shared/domain/test-order';
import { TestOrderDto } from '../../../shared/dto/test-order-dto';

@Component({
  selector: 'app-order-confirm-dialog',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      subject: string,
      assetName: string,
      testOrder: TestOrder
    },
    public dialogRef: MatDialogRef<ConfirmOrderComponent>,
    public orderService: OrderService
  ) {
    //
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  createOrder(): void {
    console.time("ConfirmOrderComponent::createOrder");
    const testOrderDto = this.toTestOrderDto(this.data.assetName, this.data.testOrder);
    this.orderService.createTestOrder(this.data.assetName, testOrderDto)
      .subscribe(() => this.closeDialog(), error => {
        console.log(error)
        this.closeDialog();
      }, () => {
        console.timeEnd("ConfirmOrderComponent::createOrder");
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  private toTestOrderDto(assetName: string, testOrder: TestOrder) {
    return new TestOrderDto(
      assetName,
      testOrder.side,
      testOrder.type,
      testOrder.price,
      testOrder.quantity
    );
  }
}
