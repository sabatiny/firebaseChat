import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../../models/user.model";

import 'rxjs/add/operator/first'

import { UserProvider } from "../../providers/user/user";
import { AuthProvider } from "../../providers/auth/auth";
import { FirebaseAuthState } from "angularfire2";
import { HomePage } from "../home/home";


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public UserProvider: UserProvider
  
  ) {
    this.signupForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(3)]],
      username: ['',[Validators.required, Validators.minLength(3)]],
      email: ['',Validators.compose([Validators.required])],
      password: ['',[Validators.required, Validators.minLength(6)]]

    });
  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;
    let username: string = formUser.username;

    this.UserProvider.userExists(username)
      .first()
      .subscribe((userExists: boolean) => {

        if(!userExists){
          this.authProvider.createAuthUser({
            email: formUser.email,
            password: formUser.password
          }).then((authState: FirebaseAuthState) => {
      
            delete formUser.password;
            formUser.uid = authState.auth.uid;
      
            this.UserProvider.create(formUser)
              .then(() => {
                  console.log('usuário cadastrado');
                  this.navCtrl.setRoot(HomePage);
                  loading.dismiss();
              }).catch((error: any) => {
                console.log(error);
                loading.dismiss();
                this.showAlert(error);
              });
      
          }).catch((error: any) => {
            console.log(error);
            loading.dismiss();
            this.showAlert(error);
          });
      
          

        } else {
          this.showAlert(`O username ${username} já está sendo usado em outra conta!`);
          loading.dismiss();

        }

      });

    
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    
    return loading;
    
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();

  }
    

}
