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
      this.getUserList();
    })
  }

  ngOnInit(): void {
    this.getUserList();
  }

  onPageChange(config: Pagination): void {
    this.pagination = config;
    this.getUserList();
  }

  getUserList(): void {
    this.userService.userList(this.pagination.activePage, this.pagination.perPage, this.searchCtrl.value).subscribe({
      next: (res: any) => {
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
              this.getUserList();
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
        this.getUserList();
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
        this.getUserList();
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
        this.getUserList();
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
