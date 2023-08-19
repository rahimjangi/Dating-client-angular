import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  // currentUser$: Observable<User | null> = of(null);
  constructor(public accountService: AccountService,private router:Router,private toastr:ToastrService) {}
  ngOnInit(): void {
    // this.currentUser$ = this.accountService.currentUser$;
  }
  login() {
    this.accountService.login(this.model).subscribe({
      next: (val) => {
        this.router.navigateByUrl("/members");
        this.toastr.success("Welcome on board!", "Success");
      },
      error: (err) => {
        console.log(err);
        // this.toastr.error(err.error, "Login failed!");
      },
      complete: () => {
        console.log('login service completed!');
      },
    });
    console.log(this.model);
  }

  Logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
    
  }

 
}
