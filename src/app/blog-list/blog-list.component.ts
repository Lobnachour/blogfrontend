import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

export interface BlogsElement {
  title:string;
  author:string;
  content:string;
  description:string;
  upvote:number;
  downvote:number;
}

const ELEMENT_DATA: BlogsElement[] = [];

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent {
  displayedColumns: string[] = ['title', 'author', 'content', 'reviews'];
  dataSource = ELEMENT_DATA;
  dataSourceCopy=ELEMENT_DATA;
  isthumbdownPressed:boolean=false;
  isthumbupPressed:boolean=false;
  
  constructor(private router:Router,private api:ApiService){
  }
  getValue(val:string){
    if(val!=''){
      const filteredBlogs=this.dataSourceCopy.filter((blog)=>
      {return blog.author===val||blog.content===val||blog.title===val});
      this.dataSource=filteredBlogs;
    }
    else{
      this.dataSource=this.dataSourceCopy;
    }
  }
  openForm(){
    this.router.navigate(['/blogForm-component']);
  }
  getAllBlogs(){
    this.api.getBlogs().
    subscribe({next:(res)=>{this.dataSource=res;this.dataSourceCopy=res},
    error:()=>{alert("error while fetching blogs")}})
  }
  ondownvoteClick(id:number){
    this.isthumbdownPressed=!this.isthumbdownPressed;
    if(this.isthumbupPressed&&this.isthumbdownPressed){
      this.isthumbupPressed=false;
      this.dataSource[id-1].upvote-=1;
    }
    this.isthumbdownPressed?this.dataSource[id-1].downvote+=1:this.dataSource[id-1].downvote-=1;
  }
  onupvoteClick(id:number){
    this.isthumbupPressed=!this.isthumbupPressed;
    if(this.isthumbupPressed&&this.isthumbdownPressed){
      this.isthumbdownPressed=false;
      this.dataSource[id-1].downvote-=1;
    }
    this.isthumbupPressed?this.dataSource[id-1].upvote+=1:this.dataSource[id-1].upvote-=1;
    this.api.updateBlog(this.dataSource[id-1],id).
      subscribe({
        next:(data)=>{this.getAllBlogs()},
        error:()=>{console.log("error")}
        }
      )
  }
  ngOnInit(){
    this.getAllBlogs();
  }
}
