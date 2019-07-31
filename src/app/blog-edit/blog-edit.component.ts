import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {

  public currentBlog;
  public possibleCategories = ["Pregnancy", "Parenting", "Child Care"]

  constructor(
    public appService: AppService,
    private toastr: ToastrService,
    private router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {

    let myBlogId = this._route.snapshot.paramMap.get('blogId');

    this.appService.getSingleBlogInformation(myBlogId).subscribe(

      (apiResponse) => {
        if (apiResponse.status === 200) {
          this.currentBlog = apiResponse.data;
          this.toastr.success(apiResponse.message)
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        console.log(err)
        this.toastr.error("Internal Error occured!")
      }
    )
  }

  public editThisBlog(): any {
    this.appService.editBlog(this.currentBlog.blogId, this.currentBlog).subscribe(

      (apiResponse) => {
        if (apiResponse.status === 200) {
          this.toastr.success(apiResponse.message)
          setTimeout(() => {
            this.router.navigate(['/blog', this.currentBlog.blogId]);
          }, 5000)
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        console.log(err)
        this.toastr.error("Internal Error occured!")
      }

    )
  }
}