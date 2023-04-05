import { Component, OnInit } from '@angular/core';
import{ UserService } from '../../service/user.service';
import{ FormControl,FormGroup, Validators} from '@angular/forms';
// import { any } from 'joi';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  _id:any;
  name:any;
  email:any;
  password:any;
  mobile:any;
  newData:any;
  dataSource: any;

  
  
 constructor( private user:UserService) { }

 ngOnInit(): void {

  
  }
    
    registerForm = new FormGroup({
    name:new FormControl(""),
    email:new FormControl(""),
    password:new FormControl(""),
    mobile:new FormControl(""),
})

  // OnSubmit 

  onSubmit(){
   let val = this.registerForm.value
    console.log(val);
    this.user.register(val).subscribe((data:any)=>{
      console.log(data);
      alert("data successfully stored")
    
    },error=>{
        alert(error.error);
    })
    
}



}



