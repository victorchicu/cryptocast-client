import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Order} from "../../domain/order";

@Component({
  selector: 'app-order-confirm-dialog',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrderConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
  ) {
    //
    console.log(data)
  }

  ngOnInit(): void {
    //
  }

}
