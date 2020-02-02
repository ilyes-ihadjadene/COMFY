import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  AuthService: any;
  constructor(
    private platform: Platform,
    public router: Router,
    ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {});
  }
}
