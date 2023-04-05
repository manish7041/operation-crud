import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../service/user.service';
import { PopUpComponent } from '../pop-up/pop-up.component'
import { MatDialog } from '@angular/material/dialog';

export interface DialogData {
  animal: any;
  name: any;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  _id: any;
  email: any;
  password: any;
  mobile: any;
  newData: any;
  dataSource: any;
  name: any;
  animal: any;
  datas:any

  constructor(private user: UserService, public dialog: MatDialog) { }
  
  openDialog(id:any): void {
    this.user.showOne(id).subscribe(data => {
      // console.log(data);
      this.datas = data,
      console.log(this.datas);
      
    let dialogRef = this.dialog.open(PopUpComponent, {
      width: '350px',
      data: { _id: this.datas._id , name: this.datas.name, email: this.datas.email , password: this.datas.password, mobile: this.datas.mobile, }
    });

    console.log("update data");
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result;
      this.showData();
    });
  });
}
  ngOnInit(): void {
    this.showData();
  }

  // Showdata 

  showData() {
    this.user.getUser().subscribe(data => {
      this.newData = data
      console.log(this.newData);
      this.dataSource = this.newData;
    })
  }

  // delete operation in forms
  delete(id: any) {
    this.user.deleteUser(id).subscribe(data => {
      alert("data successfully delete");
    }, error => {
      alert("Something Went Wrong")
    });
    this.showData();
  }

  getOne(id: any) {
    this.user.showOne(id).subscribe(data => {
      console.log(data);
    })
  }



  displayedColumns: any[] = ['sr', 'name', 'email', 'mobile', 'delete', 'edit'];
  // dataSource = this.newData;
}



