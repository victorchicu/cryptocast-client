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
import {MatTableModule} from "@angular/material/table";
import {RouterModule, Routes} from "@angular/router";
import {MatPaginatorModule} from "@angular/material/paginator";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {NumberFormatPipe} from './shared/pipes/number-format.pipe';
import {MatToolbarModule} from "@angular/material/toolbar";
import {AssetsComponent} from './views/assets/assets.component';
import {LoginComponent} from './views/login/login.component';
import {SignupComponent} from './views/signup/signup.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {OAuth2TokenHttpInterceptor} from "./shared/interceptors/o-auth2-token-http-interceptor";
import {LogoutComponent} from './views/logout/logout.component';
import {NotFoundComponent} from './views/not-found/not-found.component';
import {AutocompleteDirective} from './shared/directives/autocomplete.directive';
import {MatDividerModule} from "@angular/material/divider";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {ANIMATION_TYPES, Ng2LoadingSpinnerModule} from 'ng2-loading-spinner'
import {AuthGuard} from "./shared/guards/auth-guard";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule} from "@angular/material/radio";
import {MatTabsModule} from "@angular/material/tabs";
import {MatRippleModule} from "@angular/material/core";
import {MatTreeModule} from "@angular/material/tree";
import {ConfirmOrderComponent} from './views/dialogs/confirm-order/confirm-order.component';
import {OpenOrdersComponent} from './views/orders/open-orders/open-orders.component';
import {OrderHistoryComponent} from './views/orders/order-history/order-history.component';
import {CreateOrderComponent} from './views/orders/create-order/create-order.component';
import {MatBadgeModule} from "@angular/material/badge";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from "@angular/material/chips";

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
  ],
  imports: [
    FormsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatSelectModule,
    MatExpansionModule,
    Ng2LoadingSpinnerModule.forRoot({
      spinnerSize: 'xl',
      animationType: ANIMATION_TYPES.cubeGrid,
    }),
    MatSlideToggleModule,
    MatRadioModule,
    MatTabsModule,
    MatRippleModule,
    MatTreeModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatChipsModule
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
    },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: {color: 'primary'},
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private readonly domSanitizer: DomSanitizer, private readonly iconRegistry: MatIconRegistry,) {
    const icons = [
      ["tagged", "/assets/tagged.svg"],
      ["untagged", "/assets/untagged.svg"],
      ["create-order", "/assets/create-order.svg"],
      ["open-orders", "/assets/open-orders.svg"],
      ["order-history", "/assets/order-history.svg"],
      ["icons8-bitcoin", "/assets/icons8-bitcoin.svg"]
    ];
    icons.forEach((entry: string[]) => {
      this.iconRegistry.addSvgIcon(
        entry[0],
        this.domSanitizer.bypassSecurityTrustResourceUrl(entry[1]),
      )
    })
  }
}
