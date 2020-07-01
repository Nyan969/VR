import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsApiService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get('http://jsonplaceholder.typicode.com/posts');
  }

  getUsers() {
    return this.http.get('http://jsonplaceholder.typicode.com/users');
  }

}
