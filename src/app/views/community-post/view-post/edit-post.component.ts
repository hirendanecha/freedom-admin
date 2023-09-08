import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CommunityPostService } from 'src/app/services/community-post.service';
import { CommunityService } from 'src/app/services/community.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class ViewCommunityPostComponent implements OnInit, AfterViewInit {
  // @Input() communityId: any;
  postDetails: any = {};
  postId: string;
  constructor(
    private communityPostService: CommunityPostService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.postId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getPostDetails();
  }

  ngAfterViewInit(): void {}

  getPostDetails(): void {
    // const userId = this.userId;
    console.log(this.postId);
    this.communityPostService.viewPost(this.postId).subscribe(
      (res: any) => {
        if (res) {
          this.postDetails = res[0];
          console.log(this.postDetails);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
