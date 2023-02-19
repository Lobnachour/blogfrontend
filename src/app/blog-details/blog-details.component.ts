import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent {
  blogDetails={};
  constructor(private router:Router){

  }
  ngOnInit(){
    this.blogDetails=history.state;
    console.log("blogdetails",this.blogDetails)
  }
  backToList(){
    this.router.navigate(['/']);
  }
}
