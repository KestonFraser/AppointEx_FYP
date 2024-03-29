import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { AppointmentCrudService } from '../../shared/services/appointment-crud.service';  // CRUD API service class
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { Appointment } from '../../shared/appointment';   // Student interface class for Data types.
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  p: number = 1;                      // Settup up pagination variable
  Appointment: Appointment[];                 // Save students data in Student's array.
  hideWhenNoAppointment: boolean = false; // Hide students data table when no student.
  noData: boolean = false;            // Showing No Student Message, when no student in database.
  preLoader: boolean = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  lecturer: boolean = false;
  student: boolean = false;
  profileData: any
  appointmentForm: FormGroup;  // Define FormGroup to appointments's form

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public appointmentCrudApi: AppointmentCrudService, // Inject student CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
  ) { }

  ngOnInit() {
    

    this.dataState(); // Initialize student's list, when component is ready
    let s = this.appointmentCrudApi.GetAppointmentsList(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.profileData = JSON.parse(localStorage.getItem('profile'));
      if (this.profileData.type === "Lecturer")
        this.lecturer = true;
      else if(this.profileData.type === "Student")
        this.student = true;

      
      this.Appointment = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Appointment.push(a as Appointment);
      })
    })
  }

  // Using valueChanges() method to fetch simple list of students data. It updates the state of hideWhenNoStudent, noData & preLoader variables when any changes occurs in student data list in real-time.
  dataState() {     
    this.appointmentCrudApi.GetAppointmentsList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoAppointment = false;
        this.noData = true;
      } else {
        this.hideWhenNoAppointment = true;
        this.noData = false;
      }
    })
  }

  createRushAppointment(){
    this.appointmentForm = new FormGroup({
      lecturer: new FormControl(""),
      date: new FormControl(""),
      time: new FormControl(""),
      type: new FormControl("")
    });
    
    this.appointmentForm.controls['type'].setValue("Help Desk");
    this.appointmentForm.controls['lecturer'].setValue("-");
    this.appointmentForm.controls['date'].setValue("Thursday 18th April, 2019");
    this.appointmentForm.controls['time'].setValue("1:30 PM");

    this.appointmentCrudApi.AddAppointment(this.appointmentForm.value); // Submit student data using CRUD API
    this.toastr.success('successfully added!'); // Show success message when data is successfully submited
  }

  // Method to delete student object
  deleteAppointment(appointment) {
    if (window.confirm('Are sure you want to delete this appointment ?')) { // Asking from user before Deleting appointment data.
      this.appointmentCrudApi.DeleteAppointment(appointment.$key) // Using Delete Appointment API to delete appointment.
      this.toastr.success('successfully deleted!'); // Alert message will show up when appointment successfully deleted.
    }
  }

}
