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
import { NumberFormatPipe } from './shared/pipes/number-format.pipe';
import {MatToolbarModule} from "@angular/material/toolbar";
import { AssetComponent } from './views/asset/asset.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {OAuth2TokenHttpInterceptor} from "./shared/interceptors/o-auth2-token-http-interceptor";
import { LogoutComponent } from './views/logout/logout.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { AutocompleteDirective } from './shared/directives/autocomplete.directive';
import {MatDividerModule} from "@angular/material/divider";
import { OrderComponent } from './views/order/order.component';
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";

const routes: Routes = [
  {
    path: '',
    component: AssetComponent,
    // canActivate: [AuthGuard]
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
    component: LogoutComponent
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
    AssetComponent,
    NotificationsComponent,
    LogoutComponent,
    NotFoundComponent,
    AutocompleteDirective,
    OrderComponent,
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
        MatExpansionModule
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
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private readonly domSanitizer: DomSanitizer, private readonly iconRegistry: MatIconRegistry,) {
    const icons = [
      ["star", "/assets/star_black_24dp.svg"],
      ["star_outline", "/assets/star_outline_black_24dp.svg"],
      ["icons8-bitcoin", "/assets/icons8-bitcoin.svg"],
    ];
    icons.forEach((entry: string[]) => {
      this.iconRegistry.addSvgIcon(
        entry[0],
        this.domSanitizer.bypassSecurityTrustResourceUrl(entry[1]),
      )
    })
  }
}
