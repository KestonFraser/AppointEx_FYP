import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// App routing modules
import { AppRoutingModule } from './shared/routing/app-routing.module';

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

// Components
import { AppComponent } from './app.component';
import { AddUserProfileComponent } from './components/add-user-profile/add-user-profile.component';
import { EditUserProfileComponent } from './components/edit-user-profile/edit-user-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AddAppointmentComponent } from './components/./add-appointment/add-appointment.component';
import { EditAppointmentComponent } from './components/./edit-appointment/edit-appointment.component';

// Auth service
// import { AuthService } from "./shared/services/auth.service";

// Reactive Form
import { ReactiveFormsModule } from "@angular/forms";
// import {MatSelectModule} from '@angular/material/select';

// Import below modules for NGX Toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// NGX Pagination
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    AddAppointmentComponent,
    EditAppointmentComponent,
    SignUpComponent,
    SignInComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    EditUserProfileComponent,
    AddUserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    // MatSelectModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    NgxPaginationModule  // Include it in imports array
  ],
  providers: [],
  bootstrap: [AppComponent]
})

// class MainModule {}
export class AppModule { }
