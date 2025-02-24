import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  private isLoggedIn: Boolean = true;
  public logoutEvent$: EventEmitter<void>;

  constructor() {
    this.logoutEvent$ = new EventEmitter();
  }

  public logout(): void {
    this.logoutEvent$.emit();
  }
}
