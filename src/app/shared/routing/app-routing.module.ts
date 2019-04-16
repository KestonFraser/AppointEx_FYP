import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated 
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';
import { AddAppointmentComponent } from '../../components/add-appointment/add-appointment.component';
import { EditAppointmentComponent } from '../../components/edit-appointment/edit-appointment.component';
import { AddUserProfileComponent } from 'src/app/components/add-user-profile/add-user-profile.component';
import { EditUserProfileComponent } from 'src/app/components/edit-user-profile/edit-user-profile.component';


// Import canActivate guard services
// import { AuthGuard } from "../../shared/guard/auth.guard";
// import { SecureInnerPagesGuard } from "../../shared/guard/secure-inner-pages.guard";

// const routes: Routes = [
//   { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
//   { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
//   { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
//   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
//   { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
//   { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] },
//   { path: 'create-appointment', component: AddAppointmentComponent },
//   { path: 'edit-appointment/:id', component: EditAppointmentComponent }
// ];

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent},
  { path: 'register-user', component: SignUpComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'add-user-profile', component: AddUserProfileComponent},
  { path: 'edit-user-profile', component: EditUserProfileComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'verify-email-address', component: VerifyEmailComponent},
  { path: 'create-appointment', component: AddAppointmentComponent },
  { path: 'edit-appointment/:id', component: EditAppointmentComponent }
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
