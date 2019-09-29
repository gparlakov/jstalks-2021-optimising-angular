import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { PusherModule } from './core/services/pusher.module';
import { HomeModule } from './home/home.module';
import { FooterComponent, HeaderComponent, SharedModule } from './shared';
import { SettingsModule } from './settings/settings.module';
import { ArticleModule } from './article/article.module';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AuthModule,
    AppRoutingModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        m: 55,
        h: 14
      }
    }),
    // pusher.com account -> angularadvancedkiev@gmail.com
    PusherModule.forRoot('ca2cdccf4124e23ec32f', {
      cluster: 'eu',
      forceTLS: true
    }),
    SettingsModule,
    ArticleModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
