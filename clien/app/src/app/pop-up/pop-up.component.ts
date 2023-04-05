import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import{ UserService } from '../service/user.service';
import{ FormControl,FormControlName,FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit  {
  registerForm: any;
  user: any;
  _id:any;
  name:any;
  email:any;
  password:any;
  mobile:any;
  newData:any;
  dataSource: any;

    updateForm = new FormGroup({
    _id:new FormControl(""),
    name:new FormControl(""),
    email:new FormControl(""),
    password:new FormControl(""),
    mobile:new FormControl(""),
})

  constructor(
    public dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , private Uservice:UserService ) { }

    ngOnInit(){
      this.dataSource = this.data
      this._id = this.data._id,
      this.name = this.data.name,
      this.email=this.data.email,
      this.password=this.data.password,
      this.mobile=this.data.mobile
    }
    
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(){
    console.log(this.data);

    let val = this.updateForm.value
     console.log(val);
     
     this.Uservice.updateUser(val).subscribe((data:any)=>{
       console.log(data);
       alert("data successfully Updated")
       this.showData();
     },(error:any)=>{
         alert(error.error);
     })
  }
showData() {
  this.Uservice.getUser().subscribe(data => {
    this.newData = data
    console.log(this.newData);
    this.dataSource = this.newData;
  })
}
}

