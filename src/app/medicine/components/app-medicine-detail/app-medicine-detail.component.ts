import { authentication_error_messages } from '../../../config/constants/clinicManagementConstants';
import { UtilityService } from '../../../core/utility-services/utility-service.service';
import { SharedService } from '../../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { snackbarMessages } from '../../../config/constants/clinicManagementConstants';
import { Subject } from 'rxjs';
import { AppMedicineService } from '../../services/app-medicine.service';
import { first } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-medicine-detail',
    templateUrl: './app-medicine-detail.component.html',
    styleUrls: ['./app-medicine-detail.component.scss']
})
export class AppMedicineDetailComponent implements OnInit {

    error_messages = authentication_error_messages;
    snackbarMessages = snackbarMessages;
    isLoading: boolean = false;
    private _unsubscribeAll: Subject<any>;

    medicineForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private sharedService: SharedService,
        private util: UtilityService,
        private appMedicineService:AppMedicineService,
        public dialogRef: MatDialogRef<AppMedicineDetailComponent>

    ) { 
        this._unsubscribeAll = new Subject();

    }

    ngOnInit() {
        this.makeMedicineForm();

    }

    makeMedicineForm() {
        this.medicineForm = this.fb.group({
            name: ['', [Validators.required]],
            indication: ['', [Validators.required]],
            usage: ['', [Validators.required]],
            instruction: ['', [Validators.required]],
        });
        this.medicineForm.updateValueAndValidity();
    }


    addMedicine() {
        if(this.medicineForm.valid){
            this.appMedicineService.addMedicine(this.medicineForm.value).pipe(first()).subscribe(res=>{
                if(res ){
                    this.openSnackBar(snackbarMessages.add_success,true);
                    this.dialogRef.close();
                }
                else{
                    this.openSnackBar(res.error,false);
                }
            })
        }
    }

    closeDialog(){
        this.dialogRef.close();

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
