import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { AuthService } from "../../shared/services/auth.service";
import { CrudService } from '../../shared/services/crud.service';    // CRUD services API
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';  // Location service is used to go back to previous component
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr


@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {
  editForm: FormGroup;  // Define FormGroup to student's edit form

  constructor(
    public authService: AuthService,
    public crudApi: CrudService,       // Inject CRUD API in constructor
    private fb: FormBuilder,            // Inject Form Builder service for Reactive forms
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,             // Router service to navigate to specific component
    private toastr: ToastrService       // Toastr service for alert message
  ) {}

  ngOnInit() {
    this.updateAppointmentData();   // Call updateStudentData() as soon as the component is ready 
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.crudApi.GetAppointment(id).valueChanges().subscribe(data => {
      console.log(data);
      this.editForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
    })
  }

  get lecturer() {
    return this.editForm.get('lecturer');
  }

  get date() {
    return this.editForm.get('date');
  }

  get time() {
    return this.editForm.get('time');
  }

  get type() {
    return this.editForm.get('type');
  }

  updateAppointmentData() {
    this.editForm = this.fb.group({
      name: [''],
      email: [''],
      idNumber: [''],
      lecturer: [''],
      mobileNumber: [''],
      date: [''],
      time: [''],
      type: ['']
    })
  }

  updateForm(){
    this.crudApi.UpdateAppointment(this.editForm.value);       // Update Appointment data using CRUD API
    this.toastr.success('updated successfully');   // Show succes message when data is successfully submited
    this.router.navigate(['dashboard']);               // Navigate to Appointment's list page when student data is updated
  }

  goBack() {
    this.location.back();
  }

}
