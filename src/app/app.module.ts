import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import {IonicModule, IonicRouteStrategy, LoadingController, Platform, ToastController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PlaceHolderPipe } from './pipes/place-holder.pipe';
import {HttpClientModule} from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import {SubirPostService} from './service/subir-post.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@NgModule({
  declarations: [AppComponent, PlaceHolderPipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
      Camera,
      File,
      ImagePicker,
      Platform,
      SubirPostService,
      ToastController,
      LoadingController,
      SocialSharing,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  exports: [
    PlaceHolderPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
