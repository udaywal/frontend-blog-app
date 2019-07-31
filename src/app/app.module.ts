import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogViewComponent } from './blog-view/blog-view.component';

import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    BlogCreateComponent,
    BlogEditComponent,
    BlogViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path:'home', component:HomeComponent},
      {path:'', redirectTo:'home', pathMatch:'full'},
      {path:'about', component:AboutComponent},
      {path:'contact', component:ContactComponent},
      {path:'create', component:BlogCreateComponent},
      {path:'edit/:blogId', component:BlogEditComponent},
      {path:'blog/:blogId', component:BlogViewComponent},
    ])
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})

export class AppModule { }
