import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteDialogComponent } from './delete-confirmation-dialog/delete-dialog.component';
import { Pagination } from 'src/app/@shared/interface/pagination';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FilterComponent } from 'src/app/@shared/components/filter/filter.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @ViewChild(FilterComponent) filterComponent: FilterComponent;
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
  searchCtrl: '';
  startDate: any;
  endDate: any;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    // this.searchCtrl = new FormControl('');
    // this.searchCtrl.valueChanges
    //   .pipe(distinctUntilChanged(), debounceTime(500))
    //   .subscribe((val: string) => {
    //     this.getUserList();
    //   });
  }

  ngOnInit(): void {
    this.getUserList();
  }

  ngAfterViewInIit(): void {
  }

  getUserList(startDate?, toDate?): void {
    this.spinner.show();
    this.userService
      .userList(
        this.pagination.activePage,
        this.pagination.perPage,
        this.searchCtrl,
        this.startDate,
        this.endDate
      ).subscribe({
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

  changeAccountType(Id: any, status: string): void {
    this.userService.changeAccountType(Id, status).subscribe({
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

  changeMediaType(id, status): void {
    this.userService.activateMedia(id, status).subscribe({
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
  onSearch(): void {
    this.searchCtrl = this.filterComponent.searchCtrl.value;
    this.startDate = this.filterComponent.startDate;
    this.endDate = this.filterComponent.toDate;
    this.getUserList()
    // Perform actions with the values obtained from the filter component
    // console.log('Searching for:', searchTerm);
  }
}
