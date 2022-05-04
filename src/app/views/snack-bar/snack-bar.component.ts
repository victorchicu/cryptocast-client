import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  constructor(/* private matSnackBar: MatSnackBar */) {
  }

  openSnackBar(message: string, action: string) {
    // this.matSnackBar.open(message, action);
  }

  ngOnInit(): void {
    //
  }

}
