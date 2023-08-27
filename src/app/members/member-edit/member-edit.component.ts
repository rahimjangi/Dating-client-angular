import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  member: Member | undefined;
  user: User | undefined;

  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (!user) return;
        this.user = user;
        console.log(user);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if (!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: (member) => {
        this.member = member;
        console.log(member);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateMember() {
    console.log(this.member);
    if (!this.member) return;
    this.memberService.updateMember(this.member).subscribe({
      next: (val) => {
        console.log(val);
        // this.spinner.show();
        this.editForm?.reset(this.member);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        setTimeout(() => { 

          // this.spinner.hide();
        }, 500);
        this.toastr.success('Profile updated successfully');
      }
    });
  }
}
