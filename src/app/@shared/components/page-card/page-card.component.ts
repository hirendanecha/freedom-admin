import { Component, Input, OnInit } from '@angular/core';
import { CommunityService } from 'src/app/services/community.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs';
import { Pagination } from 'src/app/@shared/interface/pagination';
import { DeleteDialogComponent } from '../../../views/users/delete-confirmation-dialog/delete-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-page-card',
  templateUrl: './page-card.component.html',
  styleUrls: ['./page-card.component.scss'],
})
export class PageCardComponent implements OnInit {
  @Input('activeTab') activeTab: number;
  @Input('pageType') pageType: string;
  communityList: any = [];
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
    private router: Router,
    private modalService: NgbModal
  ) {
    this.searchCtrl = new FormControl('');
    this.searchCtrl.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe((val: string) => {
        this.getCommunities();
      });
  }

  ngOnInit(): void {
    this.getCommunities();
  }

  getCommunities(): void {
    let communityObs = null;
    this.communityList = [];
    if (this.activeTab === 1) {
      communityObs = this.communityService
        ?.getApproveCommunity(
          this.pagination.activePage,
          this.pagination.perPage,
          this.searchCtrl.value,
          this.pageType,
        );
    } else {
      communityObs = this.communityService
        ?.getUnApproveCommunity(
          this.pagination.activePage,
          this.pagination.perPage,
          this.searchCtrl.value,
          this.pageType
        );
    }
    communityObs?.subscribe({
      next: (res: any) => {
        if (res.data) {
          console.log(res);
          this.communityList = res.data;
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

  openCommunity(id: any): void {
    this.router.navigate([`community/edit/${id}`]);
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
}
