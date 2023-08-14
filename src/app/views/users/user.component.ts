import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteDialogComponent } from './delete-confirmation-dialog/delete-dialog.component';
import { Pagination } from 'src/app/@shared/interface/pagination';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userData: any = [];
  pagination: Pagination = {
    activePage: 1,
    perPage: 100,
    totalItems: 0
  };
  visible = false;
  percentage = 0;
  message = '';
  type = '';
  searchCtrl: FormControl;

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {
    this.searchCtrl = new FormControl('');
    this.searchCtrl.valueChanges.pipe(distinctUntilChanged(), debounceTime(500)).subscribe((val: string) => {
      if (val) {
        this.searchUsers(val);
      } else {
        this.getUserDetails();
      }
    })
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  onPageChange(config: Pagination): void {
    this.pagination = config;
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.userService.getAllUserList(this.pagination.activePage, this.pagination.perPage).subscribe(
      (res: any) => {
        if (res.data) {
          this.userData = res.data;
          this.pagination.totalItems = res.pagination.totalItems;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchUsers(search: string): void {
    this.userService.searchUser(search, this.pagination.activePage, this.pagination.perPage).subscribe({
      next: (res) => {
        if (res.data) {
          this.userData = res.data;
          this.pagination.totalItems = res.pagination.totalItems;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  openEditUserPopup(userId: any) {
    console.log(userId);
    const modalRef = this.modalService.open(EditUserDialogComponent, {
      centered: true,
    });
    modalRef.componentInstance.userId = userId;
  }

  deleteUser(userId: any) {
    console.log(userId);
    const modalRef = this.modalService.open(DeleteDialogComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'User';
    modalRef.componentInstance.userId = userId;
    modalRef.componentInstance.message =
      'Are you sure want to delete this user?';
    modalRef.result.then((res) => {
      console.log(res);
      if (res === 'success') {
        this.userService.deleteUser(userId).subscribe(
          (res: any) => {
            if (res) {
              this.visible = true;
              this.type = 'success';
              this.message = res.message;
              modalRef.close();
              this.getUserDetails();
            }
          },
          (error) => {
            this.visible = true;
            this.type = 'danger';
            this.message = error.err.message;
            console.log(error);
          }
        );
      }
    });
  }

  changeAccountType(Id: any, status: any): void {
    this.userService.changeAccountType(Id, status).subscribe(
      (res) => {
        console.log(res);
        this.visible = true;
        this.message = res.message;
        this.type = 'success';
        this.getUserDetails();
      },
      (error) => {
        this.type = 'danger';
        this.visible = true;
        this.message = error.err.message;
      }
    );
  }

  changeIsActiveStatus(Id: any, status: any): void {
    this.userService.changeUserStatus(Id, status).subscribe(
      (res) => {
        console.log(res);
        this.visible = true;
        this.type = 'success';
        this.message = res.message;
        this.getUserDetails();
      },
      (error) => {
        this.visible = true;
        this.type = 'danger';
        this.message = error.err.message;
      }
    );
  }

  suspendUser(Id: any, status: any): void {
    this.userService.suspendUser(Id, status).subscribe({
      next: (res) => {
        console.log(res);
        this.visible = true;
        this.message = res.message;
        this.type = 'success';
        this.getUserDetails();
      },
      error: (error) => {
        this.type = 'danger';
        this.visible = true;
        this.message = error.err.message;
      }
    });
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
