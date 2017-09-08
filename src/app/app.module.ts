import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from "../pages/signin/signin";

import { AngularFireModule, FirebaseAppConfig, AuthProviders, AuthMethods } from 'angularfire2';
import { HttpModule } from "@angular/http";

import { UserProvider } from '../providers/user/user';
import { AuthProvider } from '../providers/auth/auth';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyAADTsr-PvX2sG997fCOmzyRRenT7ZviDg",
  authDomain: "ionic-firebase-chat-1ace6.firebaseapp.com",
  databaseURL: "https://ionic-firebase-chat-1ace6.firebaseio.com",
  storageBucket: "ionic-firebase-chat-1ace6.appspot.com",
  messagingSenderId: "325734058356"
};

const firebaseAuthConfig = {
  providers: AuthProviders.Custom,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    SigninPage
  ],
  imports: [
    HttpModule, 
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    SigninPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    AuthProvider
  ]
})
export class AppModule {}
