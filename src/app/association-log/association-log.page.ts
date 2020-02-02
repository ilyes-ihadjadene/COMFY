import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

//  import { UserService } from '../user.service';

@Component({
  selector: 'app-association-log',
  templateUrl: './association-log.page.html',
  styleUrls: ['./association-log.page.scss']
})
export class AssociationLogPage implements OnInit {
  username = '';
  password = '';

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  back() {
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.auth.authenticationState.subscribe(state => {
      console.log('status', state);
      if (state) {
        this.router.navigate(['asso-catalogue']);
      } else {
        this.router.navigate(['association-log']);
      }
    });
  }

  loginEmailPassword() {
    this.auth.loginEmailPassword(this.username, this.password);
  }
}
export class InlinePage {}
