import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  postBlogs(data:any){
    return this.http.post<any>("http://localhost:3000/blogsList",data);
  }
  getBlogs(){
    return this.http.get<any>("http://localhost:3000/blogsList");
  }
  updateBlog(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/blogsList/"+id,data);
  }
}
