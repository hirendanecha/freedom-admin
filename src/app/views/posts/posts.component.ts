import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Pagination } from 'src/app/@shared/interface/pagination';
import { PostService } from 'src/app/services/post.service';
import { DeleteDialogComponent } from '../users/delete-confirmation-dialog/delete-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  postList: any = [];
  pagination: Pagination = {
    activePage: 1,
    perPage: 100,
    totalItems: 0,
  };
  visible = false;
  percentage = 0;
  message = '';
  type = '';
  searchCtrl: FormControl;
  fromDate: Date
  toDate: Date

  constructor(
    private modalService: NgbModal,
    private postService: PostService,
    private router: Router
  ) {
    this.searchCtrl = new FormControl('');
    this.searchCtrl.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe((val: string) => {
        this.getPostList();
      });
  }

  ngOnInit(): void {
    this.getPostList();
  }

  onPageChange(config: Pagination): void {
    this.pagination = config;
    this.getPostList();
  }

  getPostList(): void {
    this.postService
      .getPostList(
        this.pagination.activePage,
        this.pagination.perPage,
        this.searchCtrl.value
      )
      .subscribe({
        next: (res: any) => {
          if (res.data) {
            console.log(res.data);
            this.postList = res.data;
            this.pagination.totalItems = res.pagination?.totalItems;
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  searchData(): void {
    console.log(this.fromDate, this.toDate)
  }

  // openEditUserPopup(userId: any) {
  //   console.log(userId);
  //   const modalRef = this.modalService.open(EditUserDialogComponent, {
  //     centered: true,
  //   });
  //   modalRef.componentInstance.userId = userId;
  // }

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
              this.getPostList();
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

  viewPost(id): void {
    this.router.navigate([`post-list/${id}`]);
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
