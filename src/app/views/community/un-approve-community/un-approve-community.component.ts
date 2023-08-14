import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommunityService } from 'src/app/services/community.service';
import { SocketService } from 'src/app/services/socket.service';
import { DeleteDialogComponent } from '../../users/delete-confirmation-dialog/delete-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewCommunityDialogComponent } from '../view-community/edit-community.component';

@Component({
  selector: 'app-un-approve-community',
  templateUrl: './un-approve-community.component.html',
  styleUrls: ['./un-approve-community.component.scss'],
})
export class UnApproveCommunityComponent implements OnInit, AfterViewInit {
  communityList: any = [];
  paggination: any;
  totalPages: any;
  activePage = 1;
  totalItems: any;
  pageSize: any;
  pagesToShow = 1; // Number of page links to show at a tim
  pageGroup: any;
  position = 'top-end';
  visible = false;
  percentage = 0;
  message = '';
  type = '';
  searchText = '';
  constructor(
    private communityService: CommunityService,
    private modalService: NgbModal,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getCommunities();
  }

  getCommunities(page?): void {
    const currrentPage = page || this.activePage;
    const size = 100;
    // this.communityService
    //   .getUnApproveCommunity(currrentPage, size)
    //   .subscribe((res: any) => {
    //     console.log(res);
    //     if (res.data) {
    //       this.communityList = res.data;
    //       this.paggination = res.paggination;
    //       this.totalItems = res?.pagination?.totalItems;
    //       this.pageSize = res?.pagination?.pageSize;
    //     }
    //   });
    this.socketService.getUnApproveCommunity(
      { currrentPage: currrentPage, size: size },
      (data) => {
        console.log(data);
      }
    );
    this.socketService.socket.on('get-unApprove-community', (res: any) => {
      res.forEach((element) => {
        if (element.Id) {
          this.communityList.push(element);
        }
      });
    });
  }
  approveCommunity(id, status): void {
    this.communityService.changeCommunityStatus(id, status).subscribe(
      (res) => {
        this.visible = true;
        this.message = res.message;
        this.type = 'success';
        this.getCommunities(this.activePage);
      },
      (error) => {
        this.type = 'danger';
        this.visible = true;
        this.message = error.err.message;
      }
    );
  }

  deleteCommunity(Id): void {
    const modalRef = this.modalService.open(DeleteDialogComponent, {
      centered: true,
    });
    // modalRef.componentInstance.userId = userId;
    modalRef.componentInstance.title = 'Community';
    modalRef.componentInstance.message =
      'Are you sure want to delete this community?';
    modalRef.result.then((res) => {
      console.log(res);
      if (res === 'success') {
        this.communityService.deleteCommunity(Id).subscribe(
          (res) => {
            this.visible = true;
            this.type = 'success';
            this.message = res.message;
            modalRef.close();
            this.getCommunities(this.activePage);
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

  // openCommunity(Id): void {
  //   const modalRef = this.modalService.open(ViewCommunityDialogComponent, {
  //     centered: true,
  //     size: 'lg',
  //   });
  //   modalRef.componentInstance.communityId = Id;
  // }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    console.log('pages', this.totalPages);
    this.calculatePageGroup();
  }

  onPageChange(page: any): void {
    console.log(page);
    if (page < 1) {
      this.activePage = 1;
    } else if (page > this.totalPages) {
      this.activePage = this.totalPages;
    } else {
      this.activePage = page;
    }
    // this.activePage = page;
    console.log(this.activePage);
    this.getCommunities(this.activePage);

    // this.calculatePageGroup();
  }

  getPagesArray(): number[] {
    const totalPages = this.totalPages;
    // this.calculatePageGroup();
    console.log(Array.from({ length: totalPages }, (_, i) => i + 1));
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
  }

  getCommunityList(): void {
    const currrentPage = this.activePage;
    const size = 100;
    console.log(this.searchText);
    if (this.searchText) {
      this.communityService
        .searchCommunity(this.searchText, currrentPage, size)
        .subscribe(
          (res) => {
            if (res) {
              this.communityList = res.data;
            }
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.getCommunities(this.activePage);
    }
  }
}
