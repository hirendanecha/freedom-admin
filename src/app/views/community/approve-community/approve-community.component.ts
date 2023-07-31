import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunityService } from 'src/app/services/community.service';
import { ViewCommunityDialogComponent } from '../view-community/edit-community.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approve-community',
  templateUrl: './approve-community.component.html',
  styleUrls: ['./approve-community.component.scss'],
})
export class ApproveCommunityComponent implements OnInit {
  communityList: any = [];
  paggination: any;
  totalPages: any;
  activePage = 1;
  totalItems: any;
  pageSize: any;
  pagesToShow = 10; // Number of page links to show at a tim
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCommunities();
  }

  getCommunities(page?): void {
    const currrentPage = 1 || page || this.activePage;
    const size = 100;
    this.communityService
      .getApproveCommunity(currrentPage, size)
      .subscribe((res: any) => {
        if (res.data) {
          this.communityList = res.data;
          this.paggination = res.paggination;
          this.totalItems = res?.pagination?.totalItems;
          this.pageSize = res?.pagination?.pageSize;
        }
      });
  }

  upApproveCommunity(id, status): void {
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

  deleteCommunity(Id): void {}

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

  openCommunity(id: any): void {
    // const modalRef = this.modalService.open(ViewCommunityDialogComponent, {
    //   centered: true,
    //   size: 'lg',
    //   scrollable: false,
    // });
    // modalRef.componentInstance.communityId = Id;
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
}
