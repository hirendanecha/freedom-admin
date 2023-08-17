import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunityService } from 'src/app/services/community.service';
import { ViewCommunityDialogComponent } from '../view-community/edit-community.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs';
import { Pagination } from 'src/app/@shared/interface/pagination';

@Component({
  selector: 'app-approve-community',
  templateUrl: './approve-community.component.html',
  styleUrls: ['./approve-community.component.scss'],
})
export class ApproveCommunityComponent implements OnInit {
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
    private modalService: NgbModal,
    private router: Router,
    private socketService: SocketService
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
    this.communityService
      .getApproveCommunity(
        this.pagination.activePage,
        this.pagination.perPage,
        this.searchCtrl.value
      )
      .subscribe((res: any) => {
        if (res.data) {
          console.log(res);
          this.communityList = res.data;
          this.pagination.totalItems = res?.pagination?.totalItems;
          this.pagination.perPage = res?.pagination?.pageSize;
        }
      });

    // this.socketService.getApproveCommunity(
    //   { currrentPage: currrentPage, size: size },
    //   (data) => {
    //     console.log(data);
    //   }
    // );
    // this.socketService.socket.on('get-Approve-community', (res: any) => {
    //   this.communityList = res;
    // });
  }

  upApproveCommunity(id, status): void {
    this.communityService.changeCommunityStatus(id, status).subscribe(
      (res) => {
        this.visible = true;
        this.message = res.message;
        this.type = 'success';
        this.getCommunities();
      },
      (error) => {
        this.type = 'danger';
        this.visible = true;
        this.message = error.err.message;
      }
    );
  }

  deleteCommunity(Id): void {}

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
    this.communityService.createCommunityAdmin(data).subscribe(
      (res: any) => {
        if (res) {
          return res;
        }
      },
      (error) => {
        console.log(error);
      }
    );
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
