import {Component} from '@angular/core';
import {OrderComponent} from "../order-component";
import {HttpParams} from "@angular/common/http";
import {Page} from "../../../shared/paging/page";
import {OrderDto} from "../../../shared/dto/order-dto";
import {OrderService} from "../../../services/order.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-open-orders',
  templateUrl: './open-orders.component.html',
  styleUrls: ['./open-orders.component.scss']
})
export class OpenOrdersComponent extends OrderComponent {
  assetNameQueryParam: string

  constructor(private orderService: OrderService, private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params: Params) => {
          this.assetNameQueryParam = params.assetName;
          console.log(this.assetNameQueryParam);
        }
      );
    super.ngOnInit();
  }

  fetchOrders(assetName: string) {
    console.log('OrderHistoryComponent::fetchOrders BEGIN')
    const params = new HttpParams()
      .set('page', 0)
      .set('size', 10);
    this.orderService.getOpenOrders(assetName, params)
      .subscribe((page: Page<OrderDto[]>) => {
        console.log(page)
        if (page && page.content) {
          const orders: OrderDto[] = page.content;
          orders!.forEach((orderDto: OrderDto) => {
            this.orderElements.unshift(OrderComponent.toOrderElement(orderDto))
          })
          if (orders.length > 0) {
            this.table.renderRows();
          }
        }
      }, error => {
        console.log(error)
      });
    console.log('OrderHistoryComponent::fetchOrders END')
  }
}
