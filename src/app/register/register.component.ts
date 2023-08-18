import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(private accountService: AccountService,private toastr:ToastrService) {}

  register() {
    this.accountService.register(this.model).subscribe({
      next: (user) => {
        console.log(user);
        this.cancel();
        this.toastr.success("Welcom on board!", "Registeration successfull");
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error, "Failed to register!");

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
