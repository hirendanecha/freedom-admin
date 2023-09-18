import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterComponent } from 'src/app/@shared/components/filter/filter.component';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class ViewPostComponent implements OnInit, AfterViewInit {
  // @Input() communityId: any;
  @ViewChild(FilterComponent) filterComponent: FilterComponent;
  postDetails: any = {};
  postId: string;
  isOpenCommentsPostId = '';
  isExpand = false;
  commentList = []
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

  ngAfterViewInit(): void { }

  getPostDetails(): void {
    // const userId = this.userId;
    console.log(this.postId);
    this.postService.getPostDetails(this.postId).subscribe({
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

  viewComments(id): void {
    this.isExpand = this.isOpenCommentsPostId == id ? false : true;
    this.isOpenCommentsPostId = id;
    if (!this.isExpand) {
      this.isOpenCommentsPostId = null;
    } else {
      this.isOpenCommentsPostId = id;
    }

    this.postService.getComments(id).subscribe({
      next: (res) => {
        if (res) {
          this.commentList = res.data.commmentsList.map((ele: any) => ({
            ...ele,
            replyCommnetsList: res.data.replyCommnetsList.filter((ele1) => {
              return ele.id === ele1.parentCommentId;
            }),
          }));
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  onSearch(): void {
    const searchTerm = this.filterComponent.searchCtrl.value;
    const startDate = this.filterComponent.startDate;
    const toDate = this.filterComponent.toDate;

    // Perform actions with the values obtained from the filter component
    console.log('Searching for:', searchTerm);
    console.log('Date Range: From', startDate, 'To', toDate);
  }
}
