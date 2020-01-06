import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { UserData } from '../../user.module';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  list: UserData[];

  constructor(private service: AuthService,
    private firestore: AngularFirestore,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.service.getUsers().subscribe(data => {
      this.list = data.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as UserData;
      })
    });
  }

  onEdit(emp: UserData) {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc('UserData/' + id).delete();
      this.toastr.warning('Deleted successfully','User Registered');
    }
  }
  

}
