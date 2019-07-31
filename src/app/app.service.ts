import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public allBlogs;
  public currentBlog;
  public baseUrl = 'https://blogapp.edwisor.com/api/v1/blogs';
  public authToken = 'NTkwYzViODkxNmEzZTlhOTRmM2UzYzI4MzZkYTI2YjU5YWQ1ZWMyZWExOGVjMmUxMDdiM2FkYmQwZjgyM2VkMzNiMmUzZTU4MmM0ZjVmMTNmNDc3ZGI5MDNjZWNiMzEzZDIyNzJjZjQ1NDZlNDg2Zjc2ZGEyOTdlNjMzMzI0ZDFlZA=='

  constructor(
    private http: HttpClient
  ) { }

  public getAllBlogs(): any {
    let apiResponse = this.http.get(this.baseUrl + '/all?authToken=' + this.authToken);
    return apiResponse; 
  }

  public createBlog(blogData): any {
    let apiResponse = this.http.post(this.baseUrl + '/create' + '?authToken=' + this.authToken, blogData);
    return apiResponse;
  }

  public editBlog(blogId, blogData): any {
    let apiResponse = this.http.put(this.baseUrl + '/' + blogId + '/edit' + '?authToken=' + this.authToken, blogData);
    return apiResponse;
  }

  public getSingleBlogInformation(currentBlogId): any {
    let apiResponse = this.http.get(this.baseUrl + '/view' + '/' + currentBlogId + '?authToken=' + this.authToken);
    return apiResponse;
  }

  public deleteBlog(blogId): any {
    let data = {}
    let apiResponse = this.http.post(this.baseUrl + '/' + blogId + '/delete' + '?authToken=' + this.authToken, data);
    return apiResponse;
  }

}


  