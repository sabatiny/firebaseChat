import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { SignupPage } from "../signup/signup";
import { AuthProvider } from "../../providers/auth/auth";
import { HomePage } from "../home/home";

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder
  ) {
    this.signinForm = this.formBuilder.group({
      email: ['',Validators.compose([Validators.required])],
      password: ['',[Validators.required, Validators.minLength(6)]]

    });
  }

  onSubmit(): void{

    let loading: Loading = this.showLoading();
    this.authProvider.signinWithEmail(this.signinForm.value)
      .then((isLogged: boolean) => {
        if(isLogged){
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }


      }).catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      });

  }
  onSignup():void {
    this.navCtrl.push(SignupPage);
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
