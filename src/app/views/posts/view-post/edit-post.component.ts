import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CommunityService } from 'src/app/services/community.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class ViewPostComponent implements OnInit, AfterViewInit {
  // @Input() communityId: any;
  postDetails: any = {};
  postId: string;
  constructor(
    private postService: PostService,
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
    this.postService.viewPost(this.postId).subscribe({
      next: (res: any) => {
        if (res) {
          this.postDetails = res[0];
          console.log(this.postDetails);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
