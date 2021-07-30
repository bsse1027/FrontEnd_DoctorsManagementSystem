import { BlankComponent } from './blank/blank.component';
import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavSideBarComponent } from './nav-side-bar/nav-side-bar.component';
import { AuthGuard } from '../core/security-services/auth.guard';

export const routes: Routes = [
    {
		path: '',
		redirectTo: 'doctor',
		pathMatch: 'full'
	},
	{
		path: '',
		component: NavSideBarComponent,
		children: [
			
			{
				path:'doctor',
				loadChildren:'../doctor/doctor.module#DoctorModule',
				canActivate: [AuthGuard]

			},
			{
				path:'patient',
				loadChildren:'../patient/patient.module#PatientModule',
				canActivate: [AuthGuard]

			},
			{
				path:'medicine',
				loadChildren:'../medicine/medicine.module#MedicineModule',
				canActivate: [AuthGuard]
			},
			{
				path:'profile',
				loadChildren:'../profile/profile.module#ProfileModule',
				canActivate: [AuthGuard]
			}
			
		]
	},
    {
		path: '',
		component: BlankComponent,
		children: [
			{
				path: 'authentication',
				loadChildren: '../authentication/authentication.module#AuthenticationModule',
				
			}
		]
	},
	
    {
		path: '**',
		component: NotFoundComponent
	}
];