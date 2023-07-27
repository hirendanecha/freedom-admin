import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/containers/user';
@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss'],
})
export class EditUserDialogComponent implements OnInit {
  @Input() userId: any;
  userDetails: User;
  constructor(
    public activateModal: NgbActiveModal,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    const userId = this.userId;
    this.userService.getUserDetailsById(userId).subscribe(
      (res: any) => {
        if (res) {
          this.userDetails = res[0];
          console.log(this.userDetails);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
