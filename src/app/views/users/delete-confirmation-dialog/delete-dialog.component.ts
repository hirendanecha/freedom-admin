import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/containers/user';
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  @Input() userId: any;
  @Input() message: any;
  @Input() title: any;
  visible = false;
  percentage = 0;
  type = '';
  position = 'top-end';
  resMessage = '';
  constructor(
    public activateModal: NgbActiveModal,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  deleteUser(): void {
    const userId = this.userId;
    this.userService.deleteUser(userId).subscribe(
      (res: any) => {
        if (res) {
          this.visible = true;
          this.type = 'success';
          this.resMessage = res.message;
          this.activateModal.close();
        }
      },
      (error) => {
        this.visible = true;
        this.type = 'danger';
        this.resMessage = error.err.message;
        console.log(error);
      }
    );
  }

  onVisibleChange(event: boolean) {
    console.log(event);
    this.visible = event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange(event: number) {
    this.percentage = event * 25;
  }
}
