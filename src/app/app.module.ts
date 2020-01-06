import { AuthService } from './auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import {FormsModule} from '@angular/forms';
import { UsersComponent } from './auth/users/users.component';
import { UserComponent } from './auth/users/user/user.component';
import { UserListComponent } from './auth/users/user-list/user-list.component';
import { AngularFirestore} from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ToastrModule } from 'ngx-toastr';  //for success msg 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //for animation of success msg 




@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    UserComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp( environment.firebaseConfig), //config the firebase with app module
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,


  ],
  providers: [AngularFirestore, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
