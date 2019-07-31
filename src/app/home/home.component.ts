import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service'

import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public allBlogs:any;

  constructor(
    public appService:AppService,
    private toastr:ToastrService,
    private _route:ActivatedRoute,
    private router:Router
    ) {  }

  ngOnInit() {

    this.allBlogs = this.appService.getAllBlogs().subscribe(

      (apiResponse) => {
        if(apiResponse.status === 200){
      console.log(apiResponse)
      this.toastr.success(apiResponse.message);
      setTimeout(() => {
        this.allBlogs = apiResponse.data;
      }, 2000);
      } else {
        this.toastr.error(apiResponse.message)
      }
    }, (error) => {
      console.log(error.errorMessage)
      this.toastr.error('some internal error occured!')
      }

    )

  }

  public deleteThisBlog(theBlogId): any {

    this.appService.deleteBlog(theBlogId).subscribe(

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

}
