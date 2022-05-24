import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NotificationsComponent} from './pages/notifications/notifications.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NumberFormatPipe} from './shared/pipes/number-format.pipe';
import {HomeComponent} from './pages/home/home.component';
import {SigninComponent} from './pages/signin/signin.component';
import {SignupComponent} from './pages/signup/signup.component';
import {OAuth2TokenHttpInterceptor} from "./shared/interceptors/o-auth2-token-http-interceptor";
import {LogoutComponent} from './pages/logout/logout.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {AutocompleteDirective} from './shared/directives/autocomplete.directive';
import {AuthGuard} from "./shared/guards/auth-guard";
import {ConfirmOrderComponent} from './pages/dialogs/confirm-order/confirm-order.component';
import {OpenOrdersComponent} from './pages/orders/open-orders/open-orders.component';
import {OrderHistoryComponent} from './pages/orders/order-history/order-history.component';
import {CreateOrderComponent} from './pages/orders/create-order/create-order.component';
import {ChartComponent} from './pages/charts/chart.component';
import {SnackBarComponent} from './pages/snack-bar/snack-bar.component';
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
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {PasswordModule} from "primeng/password";
import {InputSwitchModule} from "primeng/inputswitch";
import {CarouselModule} from "primeng/carousel";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {RatingModule} from "primeng/rating";
import {ToggleButtonModule} from "primeng/togglebutton";
import {StepsModule} from "primeng/steps";
import {InputMaskModule} from "primeng/inputmask";
import {DropdownModule} from "primeng/dropdown";
import {SelectButtonModule} from "primeng/selectbutton";
import {RadioButtonModule} from "primeng/radiobutton";
import {ListboxModule} from "primeng/listbox";
import {AccordionModule} from "primeng/accordion";
import {PanelModule} from "primeng/panel";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {MyExchangesComponent} from './pages/my-exchanges/my-exchanges.component';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {ChipModule} from "primeng/chip";
import {FieldsetModule} from "primeng/fieldset";
import {FileUploadModule} from "primeng/fileupload";
import {ApiConnectDialogComponent} from './pages/dialogs/connect-dialog/api-connect-dialog.component';
import {OAuth2RedirectComponent} from './pages/oauth2/oauth2-redirect/o-auth2-redirect.component';
import {CookieModule} from "ngx-cookie";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-exchanges',
    component: MyExchangesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'oauth2/redirect',
    component: OAuth2RedirectComponent
  },
  {
    path: '#/oauth2/redirect',
    component: OAuth2RedirectComponent
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
    SigninComponent,
    SignupComponent,
    NumberFormatPipe,
    HomeComponent,
    NotificationsComponent,
    LogoutComponent,
    NotFoundComponent,
    AutocompleteDirective,
    ConfirmOrderComponent,
    OpenOrdersComponent,
    OrderHistoryComponent,
    CreateOrderComponent,
    SnackBarComponent,
    ChartComponent,
    MyExchangesComponent,
    ApiConnectDialogComponent,
    OAuth2RedirectComponent,
  ],
  imports: [
    FormsModule,
    RouterModule.forRoot(routes, {useHash: true}),
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
    AutoCompleteModule,
    CardModule,
    CheckboxModule,
    PasswordModule,
    InputSwitchModule,
    CarouselModule,
    MessagesModule,
    ToastModule,
    OverlayPanelModule,
    RatingModule,
    ToggleButtonModule,
    StepsModule,
    InputMaskModule,
    DropdownModule,
    SelectButtonModule,
    RadioButtonModule,
    ListboxModule,
    AccordionModule,
    PanelModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    DialogModule,
    ChipModule,
    FieldsetModule,
    FileUploadModule,
    CookieModule.withOptions()
  ],
  providers: [{
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: OAuth2TokenHttpInterceptor
    },
    // {
    //   provide: InjectableRxStompConfig,
    //   useValue: rxStompConfig,
    // },
    // {
    //   provide: RxStompService,
    //   useFactory: rxStompServiceFactory,
    //   deps: [InjectableRxStompConfig],
    // }
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
  //
}
