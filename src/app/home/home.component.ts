import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode = false;
  urlPath = 'https://localhost:5000/api/AppUsers';
  users: any;

  constructor(
    private accountService: AccountService,
    private _httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.getUsers()
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event:boolean) {
    console.log("cancel button from register form clicked!");
    this.registerMode = event;
  }

  getUsers() {
    this._httpClient.get(this.urlPath).subscribe({
      next: (response) => {
        this.users = response;
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
