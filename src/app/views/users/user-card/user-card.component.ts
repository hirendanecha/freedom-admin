import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/@shared/interface/pagination';
import { DeleteDialogComponent } from '../delete-confirmation-dialog/delete-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit, AfterViewInit {

  @Input('activeTab') activeTab: number;
  userData: any = [];
  pagination: Pagination = {
    activePage: 1,
    perPage: 100,
    totalItems: 0,
  };
  visible = false;
  percentage = 0;
  message = '';
  type = '';
  searchCtrl: FormControl;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.searchCtrl = new FormControl('');
    this.searchCtrl.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe((val: string) => {
        // this.getUser.emit();
        this.getUserList();
      });
  }

  ngOnInit(): void {
    this.getUserList();
  }

  ngAfterViewInIit(): void {
  }

  getUserList(): void {
    this.spinner.show()
    let getUsersList = null;
    this.userData = []
    if (this.activeTab === 1) {
      const isSuspended = 'Y'
      getUsersList = this.userService
        .userList(
          this.pagination.activePage,
          this.pagination.perPage,
          this.searchCtrl.value,
          isSuspended
        )
    } else {
      const isSuspended = 'N'
      getUsersList = this.userService
        .userList(
          this.pagination.activePage,
          this.pagination.perPage,
          this.searchCtrl.value,
          isSuspended
        )
    }
    getUsersList?.subscribe({
      next: (res: any) => {
        this.spinner.hide()
        if (res?.data) {
          this.userData = res?.data;
          this.pagination.totalItems = res?.pagination?.totalItems;
        }
      },
      error: (error) => {
        this.spinner.hide()
        console.log(error);
      },
    });
  }

  ngAfterViewInit(): void {
  }

  onPageChange(config: Pagination): void {
    this.pagination = config;
    // this.getUser.emit();
    this.getUserList();
  }

  openEditUserPopup(profileId: any) {
    // console.log(userId);
    // const modalRef = this.modalService.open(EditUserDialogComponent, {
    //   centered: true,
    // });
    // modalRef.componentInstance.userId = userId;
    this.router.navigate([`user/${profileId}`])
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
        this.userService.deleteUser(userId).subscribe({
          next: (data: any) => {
            if (data) {
              this.visible = true;
              this.type = 'success';
              this.message = 'User deleted successfully';
              modalRef.close();
              this.getUserList();

            }
          },
          error: (error) => {
            this.visible = true;
            this.type = 'danger';
            this.message = error.err.message;
            console.log(error);
          },
        });
      }
    });
  }

  changeAccountType(Id: any, status: any): void {
    this.userService.changeAccountType(Id, status).subscribe({
      next: (res) => {
        console.log(res);
        this.visible = true;
        this.message = res.message;
        this.type = 'success';
        // this.getUser.emit();
        this.getUserList();
      },
      error: (error) => {
        this.type = 'danger';
        this.visible = true;
        this.message = error.err.message;
      },
    });
  }

  changeIsActiveStatus(Id: any, status: any): void {
    this.userService.changeUserStatus(Id, status).subscribe({
      next: (res) => {
        console.log(res);
        this.visible = true;
        this.type = 'success';
        this.message = res.message;
        // this.getUser.emit();
        this.getUserList();
      },
      error: (error) => {
        this.visible = true;
        this.type = 'danger';
        this.message = error.err.message;
      },
    });
  }

  suspendUser(id: any, status: any): void {
    console.log(id, status)
    this.userService.suspendUser(id, status).subscribe({
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
      },
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
