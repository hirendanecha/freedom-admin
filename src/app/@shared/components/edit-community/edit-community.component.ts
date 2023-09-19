import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CommunityService } from 'src/app/services/community.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-edit-community',
  templateUrl: './edit-community.component.html',
  styleUrls: ['./edit-community.component.scss'],
})
export class EditCommunityComponent implements OnInit, AfterViewInit {
  // @Input() communityId: any;
  communityDetails: any = {};
  memberDetails: any = {};
  dropdownSettings: IDropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  communityId: any;
  isPage = false;
  searchText = ''
  userNameSearch = '';
  userList = [];
  @ViewChild('userSearchDropdownRef', { static: false, read: NgbDropdown }) userSearchNgbDropdown: NgbDropdown;
  @ViewChild('postMessageInput', { static: false }) postMessageInput: ElementRef;

  constructor(
    private communityService: CommunityService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.communityId = this.route.snapshot.paramMap.get('id');
    console.log(this.router);
    this.isPage = this.router.routerState.snapshot.url.includes('pages')
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'ID',
      textField: 'Username',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false
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
    this.communityService.getCommunityById(this.communityId).subscribe({
      next: (res: any) => {
        if (res) {
          this.communityDetails = res[0];
          this.memberDetails = res[0].memberList[0];
          console.log(this.communityDetails);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getUserList(): void {
    this.userService.getUserList().subscribe({
      next: (res: any) => {
        if (res.data) {
          this.dropdownList = res.data;
          console.log(this.dropdownList);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
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
      profileId: this.selectedItems[0]?.ID,
      communityId: Number(this.communityId),
      isActive: 'Y',
      isAdmin: 'Y',
    };
    this.communityService.createCommunityAdminByMA(data).subscribe({
      next: (res: any) => {
        if (res) {
          console.log(res);
          this.router.navigate(['/community']);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  messageOnKeyEvent(): void {

    const text = this.postMessageInput.nativeElement.innerHTML;
    const atSymbolIndex = text.lastIndexOf('@');

    if (atSymbolIndex !== -1) {
      this.userNameSearch = text.substring(atSymbolIndex + 1);
      if (this.userNameSearch?.length > 2) {
        // this.getUserList(this.userNameSearch);
      } else {
        this.clearUserSearchData();
      }
    } else {
      this.clearUserSearchData();
    }
    // this.postData.postdescription = text;
  }

  clearUserSearchData(): void {
    this.userNameSearch = '';
    this.userList = [];
    // this.userSearchNgbDropdown.close();
  }

  // getUserList(search: string): void {
  //   this.userService.getProfileList(search).subscribe({
  //     next: (res: any) => {
  //       if (res?.data?.length > 0) {
  //         this.userList = res.data;
  //         this.userSearchNgbDropdown.open();
  //       } else {
  //         this.clearUserSearchData();
  //       }
  //     },
  //     error: () => {
  //       this.clearUserSearchData();
  //     },
  //   });
  // }

  selectTagUser(user): void {
    const postHtml = this.postMessageInput.nativeElement.innerHTML;
    const text = postHtml.replaceAll(
      `@${this.userNameSearch}`,
      `<a class="text-warning">@${user?.Username}</a>`
    );
    this.renderer.setProperty(
      this.postMessageInput.nativeElement,
      'innerHTML',
      text
    );
    console.log(text)
  }
}
