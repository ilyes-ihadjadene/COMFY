import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { auth } from 'firebase';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticationState = new BehaviorSubject(false);

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private alertController: AlertController
  ) {}

  async loginEmailPassword(username: string, password: string) {
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(
        username,
        password
      );
      localStorage.setItem('userEP', JSON.stringify(res));
      this.authenticationState.next(true);
      this.router.navigate(['asso-catalogue']);
    } catch (err) {
      console.dir(err);
      this.authenticationState.next(false);
      if (err.code === 'auth/user-not-found' || 'auth/argument-error') {
        console.log('User not found');
        const alert = await this.alertController.create({
          header: 'Alert',
          subHeader: 'Subtitle',
          message: 'This is an alert message.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }

  async signoutEmailPassword() {
    try {
      const res = await this.afAuth.auth.signOut();
      this.authenticationState.next(false);
      this.router.navigate(['association-log']);
    } catch (err) {
      console.dir(err);
      this.authenticationState.next(true);
    }
  }

  async loginGoogle() {
    const provider = new auth.GoogleAuthProvider();
    let token = null;
    // var data = result ;
    auth()
      .signInWithPopup(provider)
      .then(result => {
        localStorage.setItem('user', JSON.stringify(result));
        const cred: any = result.credential.toJSON();
        token = cred.oauthAccessToken;
      })
      .catch(function(error) {
        console.dir(error);
        this.authenticationState.next(false);
      })
      .finally(() => {
        if (token != null) {
          this.authenticationState.next(true);
          this.router.navigate(['etu-catalogue-co']);
        }
      });
  }

  async signOutGoogle() {
    auth()
      .signOut()
      .then(() => {})
      .catch(error => {
        console.dir(error);
      })
      .finally(() => {
        this.router.navigate(['asso-catalogue']);
        this.authenticationState.next(false);
      });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
