import { Component, OnInit } from '@angular/core';
import { CommunityPostService } from '../../services/community-post.service';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs';
@Component({
  selector: 'app-community-posts',
  templateUrl: './community-posts.component.html',
  styleUrls: ['./community-posts.component.scss'],
})
export class CommunityPostComponent implements OnInit {

  searchCtrl: FormControl;
  postList: any = [];

  constructor(private communityPostService: CommunityPostService) {
    this.searchCtrl = new FormControl('');
    this.searchCtrl.valueChanges.pipe(distinctUntilChanged(), debounceTime(500)).subscribe((val: string) => {
      this.getPostList();
    });
  }

  ngOnInit(): void {
    this.getPostList();
  }

  getPostList() {
    this.communityPostService.getPostList().subscribe(
      (res: any) => {
        if (res) {
          // this.postList = res;
          console.log(this.postList);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openCommunityPost(id) { }
  deleteCommunity(Id) {}
  getPosts() {}
}
