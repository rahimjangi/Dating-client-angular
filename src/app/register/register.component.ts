import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(private accountService: AccountService) {}

  register() {
    this.accountService.register(this.model).subscribe({
      next: (user) => {
        console.log(user);
        this.cancel();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('register completed!');
      },
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
