import { Injectable } from '@angular/core';
import { UserProfile } from '../user-profile';  // Appointment data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object


@Injectable({
  providedIn: 'root'
})
export class UserProfileCrudService {

  profilesRef: AngularFireList<any>;    // Reference to Profile data list, its an Observable
  profileRef: AngularFireObject<any>;   // Reference to Profile object, its an Observable too

  userData = JSON.parse(localStorage.getItem('user'));

  constructor(private db: AngularFireDatabase) { }

  // Create Profile
  CreateProfile(profile: UserProfile) {
    var userType;
    console.log(this.userData);
    if(profile.idNumber.length == 8 && profile.idNumber.charAt(0)== '3')
      userType = "Staff";
    else
      userType = "Student";

    this.profilesRef.push({
      uid: this.userData.uid,
      name: profile.name,
      idNumber: profile.idNumber,
      phoneNumber: profile.phoneNumber,
      type: userType
    })
    console.log('User Profile Created!');
  }

  // Update Profile Object
  UpdateProfile(profile: UserProfile) {
    this.profileRef.update({
      uid: this.userData.uid,
      name: profile.name, //this.myData.displayName,
      idNumber: profile.idNumber, //this.myData.idNumber
      phoneNumber: profile.phoneNumber, //this.myData.phoneNumber,
      type: 'Student'
    })

    var profilesRef = this.db.database.ref("user-profile-list/");
    profilesRef.orderByChild("uid").equalTo(this.userData.uid).on("child_added",function(profileData){
      var id = profileData.key;
      //console.log("profile id is",id);
      //console.log(profileData.val());
      console.log('profile retrieved, save id and data to local storage');
      localStorage.setItem('profile', JSON.stringify(profileData.val()));
    })
  }  

   // Fetch Profiles List
   GetProfileList(){
    this.profilesRef = this.db.list('user-profile-list/');
    return this.profilesRef;
  }

  // Fetch Profile Object
  GetProfile(id: string) {
    this.profileRef = this.db.object('user-profile-list/' + id);
    return this.profileRef;
  }


  // // Delete Appointment Object
  // DeleteProfile(id: string) { 
  //   this.profileRef = this.db.object('user-profile-list/'+id);
  //   this.profileRef.remove();
  // }
}
