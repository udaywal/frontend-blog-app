import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})

export class BlogViewComponent implements OnInit {

  public currentBlog;

  constructor(
    public appService:AppService,
    private toastr:ToastrService,
    private _route:ActivatedRoute,
    private router:Router,
    private location:Location
    ) { }

  ngOnInit() {

    let myBlogId = this._route.snapshot.paramMap.get('blogId');

    this.appService.getSingleBlogInformation(myBlogId).subscribe(
      
      (apiResponse) => {
      this.currentBlog = apiResponse.data
      },
      (err) => {
        console.log(err)
        this.toastr.error("Internal Error Occured!")
    }
    )

  }

  public deleteThisBlog(): any {
    this.appService.deleteBlog(this.currentBlog.blogId).subscribe(

      (apiResponse) => {
        if(apiResponse.status === 200){
          this.toastr.success(apiResponse.message)
          setTimeout(()=>{
            this.router.navigate(['/home']);
          }, 5000)
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
          console.log(err)
          this.toastr.error("Internal Error Occured!")
      }

    )
  }

  public goBackToPreviousPage(): any {
    this.location.back();
  }

}
