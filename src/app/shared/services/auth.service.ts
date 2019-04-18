import { Injectable, NgZone } from '@angular/core';
import { User } from '../user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from "@angular/router";
import { NgIf } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private db: AngularFireDatabase
  ) { 
      /* Saving user data in localstorage when 
      logged in and setting up null when logged out */
      this.afAuth.authState.subscribe(user => {
        if (user) {
          // store user data in local storage
          console.log('user authenticated, save data to local storage');
          this.userData = user;
          //console.log(user);
          //console.log(this.userData.uid);
          localStorage.clear();
          localStorage.setItem('user', JSON.stringify(this.userData));
          //JSON.parse(localStorage.getItem('user'));

          // get associated profile and store in local storage
          var profilesRef = this.db.database.ref("user-profile-list/");
          profilesRef.orderByChild("uid").equalTo(this.userData.uid).on("child_added",function(profileData){
            var id = profileData.key;
            //console.log("profile id is",id);
            //console.log(profileData.val());
            console.log('profile retrieved, save id and data to local storage');
            localStorage.setItem('profile', JSON.stringify(profileData.val()));
            localStorage.setItem('profileID', JSON.stringify(id));
            //JSON.parse(localStorage.getItem('profile'));
          });
        } else {
          console.log('user logged out, user and profile data removed from to local storage');
          localStorage.setItem('user', null);
          localStorage.setItem('profile', null);
          localStorage.setItem('profileID', null);
          //JSON.parse(localStorage.getItem('user'));
        }
      })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          NgIf
          var profilesRef = this.db.database.ref("user-profile-list/");
          profilesRef.orderByChild("uid").equalTo(this.userData.uid).on("child_added",function(profileData){
            var id = profileData.key;
            console.log('profile retrieved, save id and data to local storage');
            localStorage.setItem('profile', JSON.stringify(profileData.val()));
            localStorage.setItem('profileID', JSON.stringify(id));
          });
          NgIf
          
        });
        this.SetUserData(result.user);
        this.router.navigate(['dashboard']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
        //this.router.navigate(['add-user-profile']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }
}
