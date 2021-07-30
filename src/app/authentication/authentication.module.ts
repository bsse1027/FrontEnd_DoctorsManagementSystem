import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './components/signin/signin.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationService } from './services/authentication.service';
import { CoreModule } from '../core/core.module';
import { DoctorSignupComponent } from './components/doctor-signup/doctor-signup.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'sign-in'
    },

    {
        path: 'sign-in',
        component: SigninComponent
    },
    {
        path: 'doctor-signup',
        component: DoctorSignupComponent
    }
]

@NgModule({
    declarations: [SigninComponent, DoctorSignupComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        CoreModule
    ],
    providers: [AuthenticationService]
})
export class AuthenticationModule { }
