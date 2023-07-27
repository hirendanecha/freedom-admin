import { Component, OnInit } from '@angular/core';
import { CommunityService } from 'src/app/services/community.service';

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
  constructor(private communityService: CommunityService) {}

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

  openCommunity(Id): void {}
}
