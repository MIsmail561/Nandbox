import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

//create a class module property we can design a form in child component
export class UserData {
    id: any;
    firstname: string;
    lastname: string;
    email: string;
 }
