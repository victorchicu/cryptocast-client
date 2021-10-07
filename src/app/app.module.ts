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
import { NumberFormatPipe } from './utils/pipes/numbers/number-format.pipe';
import {MatToolbarModule} from "@angular/material/toolbar";
import { RankComponent } from './views/rank/rank.component';
import { AuthComponent } from './views/auth/auth.component';
import { SignupComponent } from './views/signup/signup.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {OAuth2TokenHttpInterceptor} from "./interceptors/o-auth2-token-http-interceptor";
import { LogoutComponent } from './views/logout/logout.component';

const routes: Routes = [
  {path: '', component: RankComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'logout', component: LogoutComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignupComponent,
    NumberFormatPipe,
    RankComponent,
    NotificationsComponent,
    LogoutComponent,
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
    ReactiveFormsModule
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
      ["star_outline", "/assets/star_outline_black_24dp.svg"],
      ["smart_toy_black", "/assets/smart_toy_black_24dp.svg"]
    ];
    icons.forEach((entry: string[]) => {
      this.iconRegistry.addSvgIcon(
        entry[0],
        this.domSanitizer.bypassSecurityTrustResourceUrl(entry[1]),
      )
    })
  }
}
