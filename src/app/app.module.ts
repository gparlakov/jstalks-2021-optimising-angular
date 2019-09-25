import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { PusherModule } from './core/services/pusher.module';
import { HomeModule } from './home/home.module';
import { FooterComponent, HeaderComponent, SharedModule } from './shared';




@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AuthModule,
    AppRoutingModule,
    // pusher.com account -> angularadvancedkiev@gmail.com
    PusherModule.forRoot('__ca2cdccf4124e23ec32f__', {
      cluster: 'eu',
      forceTLS: true
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
