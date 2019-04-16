import { Component, OnInit } from '@angular/core';
import { UserProfileCrudService } from '../../shared/services/user-profile-crud.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {
  editForm: FormGroup;  // Define FormGroup to profile's edit form
  myData = JSON.parse(localStorage.getItem('profile'));
  id = JSON.parse(localStorage.getItem('profileID'));
  
  constructor(
    public router: Router,
    public authService: AuthService,
    public editProfileCrudApi: UserProfileCrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService,  // Toastr service for alert message
  ) { }

  ngOnInit() {
    this.updateProfileData();
    //console.log(this.id);
    this.editProfileCrudApi.GetProfile(this.id).valueChanges().subscribe(data => {
      //console.log(data);
      this.editForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
    })
  }

  updateProfileData() {
    this.editForm = this.fb.group({
      uid: [''],
      name: [''],
      idNumber: [''],
      phoneNumber: [''],
      type: ['']
    })
  }

  editProfileData(){
    this.editProfileCrudApi.UpdateProfile(this.editForm.value);       // Update Appointment data using CRUD API
    this.toastr.success('updated successfully');   // Show succes message when data is successfully submited
    this.router.navigate(['dashboard']);               // Navigate to Appointment's list page when student data is updated
  }

  goBack() {
    this.router.navigate(['dashboard']);
  }

}
