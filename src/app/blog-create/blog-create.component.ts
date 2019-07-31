import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})

export class BlogCreateComponent implements OnInit {

  public blogTitle: string;
  public blogDescription: string;
  public blogBodyHtml: string;
  public blogCategory: string;
  public possibleCategories = ["Pregnancy", "Parenting", "Child Care"]

  constructor(
    public appService:AppService, 
    private toastr:ToastrService,
    private router:Router
    ) { }

  ngOnInit() { }

  public createBlog(): any {

    let blogData = {

      title: this.blogTitle,
      description: this.blogDescription,
      blogBody: this.blogBodyHtml,
      category: this.blogCategory

    }

    this.appService.createBlog(blogData).subscribe(

      (apiResponse) => {
        if(apiResponse.status === 200){
          this.toastr.success(apiResponse.message)
          setTimeout(()=>{
            this.router.navigate(['/blog',apiResponse.data.blogId]);
          }, 5000)
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        console.log(err)
        this.toastr.error('Internal Error Occured!')
      }

    )

  }

}
