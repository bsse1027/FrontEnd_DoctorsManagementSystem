import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMedicineComponent } from './components/app-medicine/app-medicine.component';
import { AppMedicineService } from './services/app-medicine.service';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AppMedicineDetailComponent } from './components/app-medicine-detail/app-medicine-detail.component';

const routes: Routes = [
    {
        path: '',
        component: AppMedicineComponent
    }
]

@NgModule({
  declarations: [AppMedicineComponent, AppMedicineDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule

  ],
  providers:[AppMedicineService],
  entryComponents:[AppMedicineDetailComponent]
})
export class MedicineModule { }
