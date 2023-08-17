import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  model: any = {};
  logedIn = false;
  constructor(private accountService: AccountService) {}
  login() {
    this.accountService.login(this.model).subscribe({
      next: (val) => {
        console.log(val);
        this.logedIn = true;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('login service completed!');
      },
    });
    console.log(this.model);
  }

  Logout() {
    this.accountService.logout();
    this.logedIn = false;
  }
}
