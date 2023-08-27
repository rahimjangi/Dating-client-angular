import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const preventUnsaveChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {
  const toastr = inject(ToastrService);
  if (component.editForm?.dirty) {
    // toastr.info("Unsav changes will be lost!");
    return confirm("Are you sure you want to continue? Any unsave changes will be lost");
  }
  return true;
};
