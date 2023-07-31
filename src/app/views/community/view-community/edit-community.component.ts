import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CommunityService } from 'src/app/services/community.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-edit-community',
  templateUrl: './edit-community.component.html',
  styleUrls: ['./edit-community.component.scss'],
})
export class ViewCommunityDialogComponent implements OnInit, AfterViewInit {
  // @Input() communityId: any;
  communityDetails: any = {};
  dropdownSettings: IDropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  communityId: any;
  constructor(
    private communityService: CommunityService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.communityId = this.route.snapshot.paramMap.get('id');
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'Id',
      textField: 'Username',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  ngOnInit(): void {
    this.getUserDetails();
  }
  ngAfterViewInit(): void {
    this.getUserList();
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

  getUserList(): void {
    this.userService.getUserList().subscribe(
      (res: any) => {
        if (res.data) {
          this.dropdownList = res.data;
          console.log(this.dropdownList);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onItemSelect(e) {
    console.log(e);
  }

  onSelectAll(e) {
    console.log(e);
  }

  saveChanges(): void {
    console.log(this.selectedItems);
    const data = {
      userId: this.selectedItems[0]?.Id,
      communityId: this.communityId,
      IsActive: 'Y',
      IsAdmin: 'Y',
    };
    this.communityService.createCommunityAdmin(data).subscribe(
      (res: any) => {
        if (res) {
          console.log(res);
          this.router.navigate(['/community']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
