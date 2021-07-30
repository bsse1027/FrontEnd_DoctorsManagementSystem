import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppProfileComponent } from './components/app-profile/app-profile.component';
import { AppProfileService } from './services/app-profile.service';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: AppProfileComponent
    }
]


@NgModule({
    declarations: [AppProfileComponent],
    imports: [
        CommonModule,
    RouterModule.forChild(routes),
    SharedModule

    ],
    providers: [AppProfileService]
})
export class ProfileModule { }
