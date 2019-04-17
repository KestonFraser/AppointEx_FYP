import { Injectable } from '@angular/core';
import { Appointment } from '../appointment';  // Appointment data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: 'root'
})
export class AppointmentCrudService{

  appointmentsRef: AngularFireList<any>;    // Reference to Appointment data list, its an Observable
  appointmentRef: AngularFireObject<any>;   // Reference to Appointment object, its an Observable too

  userData = JSON.parse(localStorage.getItem('user'));
  profileData = JSON.parse(localStorage.getItem('profile'));

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) {}

  // Create Appointment
  AddAppointment(appointment: Appointment) {
    console.log(this.profileData);
    this.appointmentsRef.push({
      uid: this.userData.uid,
      name: this.profileData.name,
      idNumber: this.profileData.idNumber,
      email: this.userData.email,
      mobileNumber: this.profileData.phoneNumber,
      lecturer: appointment.lecturer,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type
    })
    console.log('appointment added!');
  }

  // Fetch Single Appointment Object
  GetAppointment(id: string) {
    this.appointmentRef = this.db.object('appointments-list/' + id);
    return this.appointmentRef;
  }

  // Fetch Appointments List
  GetAppointmentsList() {
    this.appointmentsRef = this.db.list('appointments-list');
    return this.appointmentsRef;
  }  

  // Update Appointment Object
  UpdateAppointment(appointment: Appointment) {
    this.appointmentRef.update({
      uid: this.userData.email,
      name: this.profileData.name,
      idNumber: this.profileData.idNumber,
      email: this.userData.email,
      mobileNumber: this.profileData.phoneNumber,
      lecturer: appointment.lecturer,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type
    })
  }  

  // Delete Appointment Object
  DeleteAppointment(id: string) { 
    this.appointmentRef = this.db.object('appointments-list/'+id);
    this.appointmentRef.remove();
  }
}
