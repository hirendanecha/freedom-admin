import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { UserService } from '../../../services/user.service';
import { DeleteDialogComponent } from '../delete-confirmation-dialog/delete-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterComponent } from 'src/app/@shared/components/filter/filter.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class ViewUserPostComponent implements OnInit, AfterViewInit {
  // @Input() communityId: any;
  @ViewChild(FilterComponent) filterComponent: FilterComponent;
  postList: any = [];
  profileId: string;
  isOpenCommentsPostId = '';
  isExpand = false;
  commentList = [];
  visible = false;
  percentage = 0;
  message = '';
  type = '';
  shouldShowSearchInput: boolean = false;
  startDate: any;
  endDate: any;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {
    this.profileId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getPostLists();
  }

  ngAfterViewInit(): void { }

  getPostLists(): void {
// const userId = this.userId;
    this.spinner.show();
    console.log(this.profileId);
    this.postService.viewPost(this.profileId, this.startDate, this.endDate).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        if (res) {
          this.postList = res.data;
          console.log(this.postList);
        }
      },
      error: (error) => {
        this.spinner.hide();
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

  deletePost(Id: any) {
    console.log(Id);
    const modalRef = this.modalService.open(DeleteDialogComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = 'Post';
    modalRef.componentInstance.userId = Id;
    modalRef.componentInstance.message =
      'Are you sure want to delete this post?';
    modalRef.result.then((res) => {
      console.log(res);
      if (res === 'success') {
        this.postService.deletePost(Id).subscribe({
          next: (res: any) => {
            if (res) {
              this.visible = true;
              this.type = 'success';
              this.message = res.message;
              modalRef.close();
              this.getPostLists();
            }
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

  onVisibleChange(event: boolean) {
    console.log(event);
    this.visible = event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange(event: number) {
    this.percentage = event * 25;
  }

  onSearch(): void {
    // const searchTerm = this.filterComponent.searchCtrl.value;
    this.startDate = this.filterComponent.startDate;
    this.endDate = this.filterComponent.toDate;
    this.getPostLists()
    // Perform actions with the values obtained from the filter component
  }
}
