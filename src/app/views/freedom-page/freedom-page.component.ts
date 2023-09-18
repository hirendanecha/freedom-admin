import { Component, ViewChild } from '@angular/core';
import { DeleteDialogComponent } from '../users/delete-confirmation-dialog/delete-dialog.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CommunityService } from 'src/app/services/community.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Pagination } from 'src/app/@shared/interface/pagination';
import { FilterComponent } from 'src/app/@shared/components/filter/filter.component';

@Component({
  selector: 'app-freedom-page',
  templateUrl: './freedom-page.component.html',
  styleUrls: ['./freedom-page.component.scss'],
})
export class CommunityComponent {
  @ViewChild(FilterComponent) filterComponent: FilterComponent;

  activeTab = 1;
  pageList: any = [];
  position = 'top-end';
  visible = false;
  percentage = 0;
  message = '';
  type = '';
  searchCtrl: '';
  pagination: Pagination = {
    activePage: 1,
    perPage: 15,
    totalItems: 0,
  };
  pageType = 'page';
  startDate: any;
  endDate: any;
  constructor(
    private communityService: CommunityService,
    private router: Router,
    private modalService: NgbModal
  ) {
    // this.searchCtrl = new FormControl('');
    // this.searchCtrl.valueChanges
    //   .pipe(distinctUntilChanged(), debounceTime(500))
    //   .subscribe((val: string) => {
    //     this.getCommunities();
    //   });
  }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    console.log('page type', this.pageType);
    this.getCommunities();
  }

  getCommunities(): void {
    this.communityService
      ?.getAllCommunity(
        this.pagination.activePage,
        this.pagination.perPage,
        this.searchCtrl,
        this.pageType,
        this.startDate,
        this.endDate
      )?.subscribe({
        next: (res: any) => {
          if (res.data) {
            this.pageList = res?.data;
            this.pagination.totalItems = res?.pagination?.totalItems;
            this.pagination.perPage = res?.pagination?.pageSize;
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  changeCommunityStatus(community, status): void {
    this.communityService
      .changeCommunityStatus(community.Id, community.profileId, status)
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
    modalRef.componentInstance.title = 'Page';
    modalRef.componentInstance.message =
      'Are you sure want to delete this page?';
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

  openCommunity(id: any): void {
    this.router.navigate([`pages/edit/${id}`]);
  }

  createCommunityAdmin(userId, communityId): void {
    const data = {
      userId: userId,
      communityId: communityId,
      isActive: 'Y',
      isAdmin: 'Y',
    };
    this.communityService.createCommunityAdminByMA(data).subscribe({
      next: (res: any) => {
        if (res) {
          return res;
        }
      },
      error: (error) => {
        console.log(error);
      },
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

  onSearch(): void {
    this.searchCtrl = this.filterComponent.searchCtrl.value;
    this.startDate = this.filterComponent.startDate;
    this.endDate = this.filterComponent.toDate;
    this.getCommunities();
  }
}