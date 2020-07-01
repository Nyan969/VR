import {Component, OnInit} from '@angular/core';
import {PostsApiService} from '../../services/posts-api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private postsApiService: PostsApiService) {
  }

  users = new BehaviorSubject(null);
  posts;
  load;
  filteredPosts;

  ngOnInit(): void {
    this.postsApiService.getUsers().subscribe(users => {
        this.users.next(users);
      },
      (response: HttpErrorResponse) => {
        console.error(response);
      });

    this.postsApiService.getPosts().subscribe(posts => {
        this.addAuthor(posts);
      },
      (response: HttpErrorResponse) => {
        console.error(response);
      });
  }

  addAuthor(posts) {
    this.users.subscribe(users => {
      this.posts = posts.map(post => {
        post.author = users.find(user => {
          return user.id === post.userId;
        }).name;
        return post;
      });
      this.allPosts();
      this.load = true;
    });
  }

  filterPosts(value) {
    if (value) {
      this.filteredPosts = Object.assign([], this.posts).filter(
        item => item.author.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
    } else {
      this.allPosts();
    }
  }

  allPosts() {
    this.filteredPosts = Object.assign([], this.posts);
  }
}

