import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { HttpClient } from '@angular/common/http';
import { MembersService } from '../_services/members.service';
import { Member } from '../_models/member';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: Member[]=[];

  constructor(
    private accountService: AccountService,
    private membersService: MembersService
  ) {}
  ngOnInit(): void {
    let user:User|null=null;
    this.accountService.currentUser$.subscribe({
      next: (data) => {
        user=data
      }
    })
    if (user) {
      this.loadMembers();
    }
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    console.log('cancel button from register form clicked!');
    this.registerMode = event;
  }


  loadMembers() {
    this.membersService.getMembers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Members loaded at home page!');
      },
    });
  }
}
