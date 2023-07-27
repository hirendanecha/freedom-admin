import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/containers/user';
import { CommunityService } from 'src/app/services/community.service';
@Component({
  selector: 'app-view-community-dialog',
  templateUrl: './view-community-dialog.component.html',
  styleUrls: ['./view-community-dialog.component.scss'],
})
export class ViewCommunityDialogComponent implements OnInit {
  @Input() communityId: any;
  communityDetails: any = {};
  constructor(
    public activateModal: NgbActiveModal,
    private communityService: CommunityService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    // const userId = this.userId;
    console.log(this.communityId);
    this.communityService.getCommunityById(this.communityId).subscribe(
      (res: any) => {
        if (res) {
          this.communityDetails = res[0];
          console.log(this.communityDetails);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
