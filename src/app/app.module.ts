import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from "@stomp/ng2-stompjs";
import {rxStompConfig} from "./rx-stomp.config";
import {NotificationsComponent} from './views/notifications/notifications.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NumberFormatPipe} from './shared/pipes/number-format.pipe';
import {AssetsComponent} from './views/assets/assets.component';
import {LoginComponent} from './views/login/login.component';
import {SignupComponent} from './views/signup/signup.component';
import {OAuth2TokenHttpInterceptor} from "./shared/interceptors/o-auth2-token-http-interceptor";
import {LogoutComponent} from './views/logout/logout.component';
import {NotFoundComponent} from './views/not-found/not-found.component';
import {AutocompleteDirective} from './shared/directives/autocomplete.directive';
import {AuthGuard} from "./shared/guards/auth-guard";
import {ConfirmOrderComponent} from './views/dialogs/confirm-order/confirm-order.component';
import {OpenOrdersComponent} from './views/orders/open-orders/open-orders.component';
import {OrderHistoryComponent} from './views/orders/order-history/order-history.component';
import {CreateOrderComponent} from './views/orders/create-order/create-order.component';
import {ChartComponent} from './views/charts/chart.component';
import {SnackBarComponent} from './views/snack-bar/snack-bar.component';
import {HighchartsChartModule} from "highcharts-angular";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {SplitButtonModule} from "primeng/splitbutton";
import {AvatarModule} from "primeng/avatar";
import {MenuModule} from "primeng/menu";
import {DividerModule} from "primeng/divider";
import {ChipsModule} from "primeng/chips";
import {AutoCompleteModule} from "primeng/autocomplete";

const routes: Routes = [
  {
    path: '',
    component: AssetsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders/history',
    component: OrderHistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders/open',
    component: OpenOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders/create',
    component: CreateOrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'trade',
    component: ChartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NumberFormatPipe,
    AssetsComponent,
    NotificationsComponent,
    LogoutComponent,
    NotFoundComponent,
    AutocompleteDirective,
    ConfirmOrderComponent,
    OpenOrdersComponent,
    OrderHistoryComponent,
    CreateOrderComponent,
    SnackBarComponent,
    ChartComponent
  ],
  imports: [
    FormsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    SplitButtonModule,
    AvatarModule,
    MenuModule,
    DividerModule,
    ChipsModule,
    AutoCompleteModule
  ],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: OAuth2TokenHttpInterceptor
    },
    {
      provide: InjectableRxStompConfig,
      useValue: rxStompConfig,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig],
    }
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
  //
}
