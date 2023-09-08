import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommunityService } from 'src/app/services/community.service';
import { SocketService } from 'src/app/services/socket.service';
import { DeleteDialogComponent } from '../../users/delete-confirmation-dialog/delete-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewCommunityDialogComponent } from '../view-community/edit-community.component';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs';
import { Pagination } from 'src/app/@shared/interface/pagination';

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
  searchCtrl: FormControl;
  pagination: Pagination = {
    activePage: 1,
    perPage: 15,
    totalItems: 0,
  };
  constructor(
    private communityService: CommunityService,
    private modalService: NgbModal,
    private socketService: SocketService
  ) {
    this.searchCtrl = new FormControl('');
    this.searchCtrl.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe((val: string) => {
        this.getCommunities();
      });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getCommunities();
  }

  getCommunities(): void {
    this.communityService
      .getUnApproveCommunity(
        this.pagination.activePage,
        this.pagination.perPage,
        this.searchCtrl.value
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.data) {
            this.communityList = res.data;
            this.pagination.totalItems = res?.pagination?.totalItems;
            this.pagination.perPage = res?.pagination?.pageSize;
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    // this.socketService.getUnApproveCommunity(
    //   { currrentPage: currrentPage, size: size },
    //   (data) => {
    //     console.log(data);
    //   }
    // );
    // this.socketService.socket.on('get-unApprove-community', (res: any) => {
    //   res.forEach((element) => {
    //     if (element.Id) {
    //       this.communityList.push(element);
    //     }
    //   });
    // });
  }
  approveCommunity(id, profileId, status): void {
    this.communityService
      .changeCommunityStatus(id, profileId, status)
      .subscribe({
        next: (res) => {
          this.visible = true;
          this.message = res.message;
          this.type = 'success';
          this.getCommunities();
        },
        error: (error) => {
          this.type = 'danger';
          this.visible = true;
          this.message = error.err.message;
        },
      });
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
        this.communityService.deleteCommunity(Id).subscribe({
          next: (res) => {
            this.visible = true;
            this.type = 'success';
            this.message = res.message;
            modalRef.close();
            this.getCommunities();
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

  onPageChange(config: Pagination): void {
    this.pagination = config;
    this.getCommunities();
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
