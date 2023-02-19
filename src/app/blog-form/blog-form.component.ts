import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent {
  constructor(private fm:FormBuilder,private router:Router,private api:ApiService){

  }
  blogForm!:FormGroup;
  ngOnInit(){
    this.blogForm=this.fm.group({title:['',Validators.required],content:['',Validators.required],
    author:['',Validators.required],description:['',Validators.required]});
  }
  addBlog(){
    if(this.blogForm.valid){
      this.blogForm.value.upvote=Math.floor(Math.random()*10);
      this.blogForm.value.downvote=Math.floor(Math.random()*10);
      this.api.postBlogs(this.blogForm.value).
      subscribe({next:(res)=>{this.blogForm.reset()},error:()=>{alert("error while adding blog")}});
    }
    this.router.navigate([""])
  }
}
