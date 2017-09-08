import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignupPage } from "../signup/signup";

import { FirebaseListObservable } from "angularfire2";

import { User } from "../../models/user.model";
import { UserProvider } from "../../providers/user/user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: FirebaseListObservable<User[]>;

  constructor(
    public userProvider: UserProvider,
    public navCtrl: NavController) {

  }
  ionViewDidLoad(){
    this.users = this.userProvider.users;
  }
  onSignup():void {
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(user: User):void{
    console.log('User: ',user);

  }
}
