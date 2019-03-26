import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { CrudService } from '../../shared/services/crud.service';  // CRUD API service class
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
  
  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public crudApi: CrudService, // Inject student CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
  ) { }

  ngOnInit() {
    this.dataState(); // Initialize student's list, when component is ready
    let s = this.crudApi.GetAppointmentsList(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
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
    this.crudApi.GetAppointmentsList().valueChanges().subscribe(data => {
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

  // Method to delete student object
  deleteAppointment(appointment) {
    if (window.confirm('Are sure you want to delete this appointment ?')) { // Asking from user before Deleting appointment data.
      this.crudApi.DeleteAppointment(appointment.$key) // Using Delete Appointment API to delete appointment.
      this.toastr.success('successfully deleted!'); // Alert message will show up when appointment successfully deleted.
    }
  }

}
