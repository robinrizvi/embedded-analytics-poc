import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SessionService } from './common/service/session/session.service';
import { NavigationStart, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Embedded Analytics POC';
  showLogoutButton: boolean = false;

  constructor(private sessionService: SessionService, private router: Router) {
    this.router.events
      .subscribe(
        (event) => {
          if (event instanceof NavigationStart) {
            if (event.url.indexOf('session-app-validation') != -1) {
              this.showLogoutButton = true;
            } else {
              this.showLogoutButton = false;
            }
          }
        }
      );
  }

  logout() {
    this.sessionService.logout();
  }
}
