import { Doctor } from './../../../config/interfaces/clinicManagement.interface';
import { authentication_error_messages, snackbarMessages } from './../../../config/constants/clinicManagementConstants';
import { UtilityService } from './../../../core/utility-services/utility-service.service';
import { SharedService } from './../../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppProfileService } from '../../services/app-profile.service';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-profile',
    templateUrl: './app-profile.component.html',
    styleUrls: ['./app-profile.component.scss']
})
export class AppProfileComponent implements OnInit {

    error_messages = authentication_error_messages;
    snackbarMessages = snackbarMessages;
    isProfileFormLoading: boolean = false;
    private _unsubscribeAll: Subject<any>;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private sharedService: SharedService,
        private util: UtilityService,
        private profileService: AppProfileService
    ) {
        this._unsubscribeAll = new Subject();
    }

    profileForm: FormGroup;
    currentAccountInfo: Doctor;
    ngOnInit() {
        this.makeProfileFormDoctor();
        this.getCurrentAccountInfo();

    }

    makeProfileFormDoctor() {
        this.profileForm = this.fb.group({
            name: ['', [Validators.required]],
            username: [{value:'', disabled: true}, [Validators.required]],
            hospitalname: ['', [Validators.required]],
            designation: ['', [Validators.required]],
        });
        this.profileForm.updateValueAndValidity();

    }

    getCurrentAccountInfo() {
        this.profileService.getCurrentDoctor().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            this.currentAccountInfo = res;
            this.patchValueInForm(res);
        })
    }

    patchValueInForm(doctorInfo: Doctor) {
        this.profileForm.patchValue({
            name: doctorInfo.doctorName,
            username:doctorInfo.username,
            hospitalname: doctorInfo.hospitalName,
            designation: doctorInfo.designation
        })



    }


    updateProfile() {
        if(this.profileForm.valid){
            this.currentAccountInfo.doctorName = this.profileForm.value.name;
            this.currentAccountInfo.hospitalName = this.profileForm.value.hospitalname;
            this.currentAccountInfo.designation = this.profileForm.value.designation;

            this.profileService.updateCurrentDoctor(this.currentAccountInfo).pipe(first()).subscribe(res=>{
                if(res && res.status==200){

                    this.openSnackBar(snackbarMessages.update_success,true);
                }
                else{
                    this.openSnackBar(res.error,false);
                }
            })
        }
        
    }

    openSnackBar(message, isAccepted) {
        this.sharedService.openSnackBar({
            data: { message: message, isAccepted: isAccepted },
            duration: 2,
            panelClass: ['recovery-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
        });
    }

    ngOnDestroy() {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
