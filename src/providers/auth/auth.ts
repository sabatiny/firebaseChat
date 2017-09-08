import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth, FirebaseAuthState } from "angularfire2";
import { BaseProvider } from "../base/base";

@Injectable()
export class AuthProvider extends BaseProvider {

  constructor(
    public auth: AngularFireAuth,
    public http: Http
  
  ) {
    super();
    console.log('Hello AuthProvider Provider');
  }

  createAuthUser(user: {email: string, password: string }): firebase.Promise<FirebaseAuthState>{
    return this.auth.createUser(user)
      .catch(this.handlePromiseError); 
  }

  signinWithEmail(user: {email: string, password: string}): firebase.Promise<boolean>{
    return this.auth.login(user)
      .then((authState: FirebaseAuthState) => {
          return authState != null;
      }).catch(this.handlePromiseError);
  }

  lougout(): Promise<void> {
    return this.auth.logout();
  }

}
