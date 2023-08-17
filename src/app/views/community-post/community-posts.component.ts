import { Component, OnInit } from '@angular/core';
import { CommunityPostService } from '../../services/community-post.service';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs';
import { Pagination } from 'src/app/@shared/interface/pagination';
@Component({
  selector: 'app-community-posts',
  templateUrl: './community-posts.component.html',
  styleUrls: ['./community-posts.component.scss'],
})
export class CommunityPostComponent implements OnInit {
  searchCtrl: FormControl;
  postList: any = [];
  pagination: Pagination = {
    activePage: 1,
    perPage: 15,
    totalItems: 0,
  };

  constructor(private communityPostService: CommunityPostService) {
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

  getPostList() {
    this.communityPostService
      .getPostList(
        this.pagination.activePage,
        this.pagination.perPage,
        this.searchCtrl.value
      )
      .subscribe(
        (res: any) => {
          if (res) {
            this.postList = res.data;
            this.pagination.totalItems = res.pagination.totalItems;
            this.pagination.perPage = res.pagination.pageSize;
            console.log(this.postList);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onPageChange(config: Pagination): void {
    this.pagination = config;
    this.getPostList();
  }

  openCommunityPost(id) {}
  deleteCommunity(Id) {}
  getPosts() {}
}
