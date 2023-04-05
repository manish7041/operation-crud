import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  constructor(private http: HttpClient ) { }
   baseURL="http://localhost:5000";

   showOne(id:any){
     return this.http.get(this.baseURL+`/user/showOne?id=${id}`);
   }

  register(value:any){
    return this.http.post(this.baseURL +'/user/register' ,value);
  }

  getUser(){
    return this.http.get(this.baseURL+"/user/showData")
  }
  deleteUser(id:any):Observable<any>{
    console.log(id);
    return this.http.delete(this.baseURL +`/user/delete?id=${id}`,{responseType:"text"});
  }
  
  loginUser(value:any){
    return this.http.post(this.baseURL+"/user/login",value)
  }

// Update (Edit)

  updateUser(data:any){
    return this.http.post(this.baseURL +"/user/update",data)
  }

}

