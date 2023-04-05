import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import{ FormControl,FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  _id:any;
  name:any;
  email:any;
  password:any;
  mobile:any;
  newData:any;
  dataSource: any;
  err:any;
  constructor(private user:UserService){}

      loginForm = new FormGroup({

    email:new FormControl(""),
    password:new FormControl(""),
})
  onSubmit(){
    let val = this.loginForm.value
     console.log(val);
     this.user.loginUser(val).subscribe((data:any)=>{
       console.log(data);
       this.err = Object.values(data)
    
     },error=>{
        this.err = error.error
         
     })
     
 }
}
