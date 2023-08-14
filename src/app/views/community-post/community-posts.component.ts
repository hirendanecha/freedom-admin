import { Component, OnInit } from '@angular/core';
import { CommunityPostService } from '../../services/community-post.service';
@Component({
  selector: 'app-community-posts',
  templateUrl: './community-posts.component.html',
  styleUrls: ['./community-posts.component.scss'],
})
export class CommunityPostComponent implements OnInit {
  postList: any = [];
  searchText = '';
  constructor(private communityPostService: CommunityPostService) {}

  ngOnInit(): void {
    this.getPostList();
  }

  getPostList() {
    this.communityPostService.getPostList().subscribe(
      (res: any) => {
        if (res) {
          this.postList = res;
          console.log(this.postList);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openCommunityPost(id) {}

  deleteCommunity(Id) {}
  getPosts() {}
}
