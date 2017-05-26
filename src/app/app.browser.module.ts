import { UniversalModule } from 'angular2-universal';
import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginModule } from './login/login.module';
import { LocalizeRouterModule } from 'localize-router';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, '/assets/locales/', '.json');
}

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'users', loadChildren: './users/users.module#UsersModule' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    UniversalModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [ Http ]
      }
    }),
    RouterModule.forRoot(routes),
    LocalizeRouterModule.forRoot(routes),
    LoginModule
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
