import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserData } from '../auth/user.module'; //to share single instance among child components.


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  formData: UserData;

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) { }

  getUsers() {
    return this.firestore.collection('UserData').snapshotChanges(); //to list all users from firestore database
  }

  getUserState() {
    return this.afAuth.authState;
  }
  
  //function for login with mail and password with check on them if exists or not and redirect to home 
  login( email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential) {
          this.router.navigate(['/home']);
        }
      })
  }
//register a new user to login and check if mail is already exists then redirect to home
  createUser(user) {
    console.log(user);
    this.afAuth.auth.createUserWithEmailAndPassword( user.email, user.password)
      .then( userCredential => {
        this.newUser = user;
        console.log(userCredential);
        userCredential.user.updateProfile( {
          displayName: user.firstName + ' ' + user.lastName
        });

        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['/home']);
          });
      })
      .catch( error => {
        this.eventAuthError.next(error);
      });
  }
//to inset data into the firebase database
  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      role: 'network user'
    })
  }
//logout function to clear the loged in user data
  logout() {
    return this.afAuth.auth.signOut();
  }
}
