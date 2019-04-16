import { Component, OnInit } from '@angular/core';
import { UserProfileCrudService } from '../../shared/services/user-profile-crud.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-add-user-profile',
  templateUrl: './add-user-profile.component.html',
  styleUrls: ['./add-user-profile.component.css']
})
export class AddUserProfileComponent implements OnInit {

  profileForm: FormGroup;

  constructor(
    public router: Router,
    public authService: AuthService,
    public editProfileCrudApi: UserProfileCrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService  // Toastr service for alert message
  ) { }

  ngOnInit() {
    this.editProfileCrudApi.GetProfileList();
    this.profileData();
  }

  profileData(){
    this.profileForm = this.fb.group({
      uid: [''],
      name: [''],
      idNumber: [''],
      phoneNumber: [''],
      type: ['']
    })
  }

  ResetForm() {
    this.profileForm.reset();
  }  
 
  submitProfileData() {
    this.editProfileCrudApi.CreateProfile(this.profileForm.value); // Submit student data using CRUD API
    this.toastr.success('Profile successfully created!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
    //this.router.navigate(['dashboard']);
  };

}
