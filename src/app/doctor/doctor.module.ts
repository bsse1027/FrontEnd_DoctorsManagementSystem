import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDoctorComponent } from './components/app-doctor/app-doctor.component';
import { AppDoctorService } from './services/app-doctor.service';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: AppDoctorComponent
    }
]

@NgModule({
    declarations: [AppDoctorComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule

    ],
    providers: [AppDoctorService]
})
export class DoctorModule { }
