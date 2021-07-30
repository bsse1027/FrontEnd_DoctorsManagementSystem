import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppPatientComponent } from './components/app-patient/app-patient.component';
import { AppPatientService } from './services/app-patient.service';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AppPatientDetailComponent } from './components/app-patient-detail/app-patient-detail.component';


const routes: Routes = [
    {
        path: '',
        component: AppPatientComponent
    },
    {
        path: 'detail',
        component: AppPatientDetailComponent
    },
    {
        path: 'detail/:id',
        component: AppPatientDetailComponent
    }
]

@NgModule({
  declarations: [AppPatientComponent, AppPatientDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule

  ],
  providers:[AppPatientService]
})
export class PatientModule { }
