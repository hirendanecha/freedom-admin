import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalModule } from '@coreui/angular';
import { UserService } from 'src/app/services/user.service';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteDialogComponent } from './delete-confirmation-dialog/delete-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, AfterViewInit {
  userData: any = [];
  paggination: any;
  totalPages: any;
  activePage = 1;
  totalItems: any;
  pageSize: any;
  pagesToShow = 5; // Number of page links to show at a tim
  pageGroup: any;
  position = 'top-end';
  visible = false;
  percentage = 0;
  message = '';
  type = '';
  searchText = '';
  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  ngAfterViewInit(): void {
    this.activePage = 1;
  }

  fetchDataForPage(page: number): void {
    // Replace this with actual data fetching logic from your API or service
    const startIndex = (page - 1) * this.pageSize;
    this.userData = Array.from({ length: this.pageSize }, (_, i) => ({
      id: startIndex + i + 1,
      name: `Item ${startIndex + i + 1}`,
    }));
  }
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    console.log('pages', this.totalPages);
    this.calculatePageGroup();
  }

  onPageChange(page: any): void {
    console.log(event);
    if (page < 1) {
      this.activePage = 1;
    } else if (page > this.totalPages) {
      this.activePage = this.totalPages;
    } else {
      this.activePage = page;
    }
    // this.activePage = event;
    console.log(this.activePage);
    this.getUserDetails(this.activePage);

    this.calculatePageGroup();
  }

  getPagesArray(): number[] {
    const totalPages = this.totalPages;
    this.calculatePageGroup();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  onNextGroup(): void {
    const lastPageInGroup = this.pageGroup[this.pageGroup.length - 1];
    this.onPageChange(lastPageInGroup + 1);
  }

  onPreviousGroup(): void {
    const firstPageInGroup = this.pageGroup[0];
    this.onPageChange(firstPageInGroup - 1);
  }

  calculatePageGroup(): void {
    const currentGroup = Math.ceil(this.activePage / this.pagesToShow);
    const lastGroup = Math.ceil(this.totalPages / this.pagesToShow);
    const start = (currentGroup - 1) * this.pagesToShow + 1;
    const end =
      currentGroup === lastGroup
        ? this.totalPages
        : currentGroup * this.pagesToShow;
    this.pageGroup = Array.from(
      { length: end - start + 1 },
      (_, i) => i + start
    );
    console.log(this.pageGroup);
  }

  getUserDetails(page?: number): void {
    const currrentPage = page || this.activePage;
    const size = 100;
    this.userService.getAllUserList(currrentPage, size).subscribe(
      (res: any) => {
        if (res.data) {
          this.userData = res.data;
          this.paggination = res.pagination;
          // this.totalPages = res?.pagination?.totalPages;
          // this.activePage = res?.pagination?.currentPage;
          this.totalItems = res?.pagination?.totalItems;
          this.pageSize = res?.pagination?.pageSize;
          console.log(this.userData, this.paggination);
          this.calculateTotalPages();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  opebEditUserPopup(userId: any) {
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
              this.getUserDetails(this.activePage);
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
        this.getUserDetails(this.activePage);
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
        this.getUserDetails(this.activePage);
      },
      (error) => {
        this.visible = true;
        this.type = 'danger';
        this.message = error.err.message;
      }
    );
  }

  suspendUser(Id: any, status: any): void {
    this.userService.suspendUser(Id, status).subscribe(
      (res) => {
        console.log(res);
        this.visible = true;
        this.message = res.message;
        this.type = 'success';
        this.getUserDetails(this.activePage);
      },
      (error) => {
        this.type = 'danger';
        this.visible = true;
        this.message = error.err.message;
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

  getUserList(): void {
    const currrentPage = this.activePage;
    const size = 100;
    console.log(this.searchText);
    if (this.searchText) {
      this.userService
        .searchUser(this.searchText, currrentPage, size)
        .subscribe(
          (res) => {
            if (res) {
              this.userData = res.data;
            }
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.getUserDetails(this.activePage);
    }
  }
}
