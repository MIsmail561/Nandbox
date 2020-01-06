import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private service: AuthService, //to use the same instance of Auth service class
    private firestore: AngularFirestore,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.resetForm();
  }
//to reset all the field of the form
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      firstname: '',
      lastname: '',
      email: '',
    }
  }
//insert and update firestore document from angular
  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null)
      this.firestore.collection('UserData').add(data);
    else
      this.firestore.doc('UserData/' + form.value.id).update(data);
    this.resetForm(form);
    this.toastr.success('Submitted successfully', 'User Registered'); //success msg using toastr
  }

}
