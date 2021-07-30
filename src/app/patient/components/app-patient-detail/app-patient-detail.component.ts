import { Doctor, Medicine, Patient } from './../../../config/interfaces/clinicManagement.interface';
import { UtilityService } from './../../../core/utility-services/utility-service.service';
import { SharedService } from './../../../shared/services/shared.service';
import { authentication_error_messages, snackbarMessages } from './../../../config/constants/clinicManagementConstants';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppPatientService } from '../../services/app-patient.service';
import { first, subscribeOn, takeUntil } from 'rxjs/operators';
import { jsPDF } from "jspdf";

@Component({
    selector: 'app-patient-detail',
    templateUrl: './app-patient-detail.component.html',
    styleUrls: ['./app-patient-detail.component.scss']
})
export class AppPatientDetailComponent implements OnInit {

    currentPatientId: string;
    error_messages = authentication_error_messages;
    snackbarMessages = snackbarMessages;
    isLoading: boolean = false;
    private _unsubscribeAll: Subject<any>;
    patientForm: FormGroup;
    medicines: Medicine[];
    currentMedicine: FormControl = new FormControl('');
    prescriptions: any = [];
    originalPrescriptions: any = [];
    loggedInDoctor: Doctor;

    @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;

    genders: any[] = [
        { value: 'Male', viewValue: 'Male' },
        { value: 'Female', viewValue: 'Female' }
    ];

    constructor(private route: ActivatedRoute, private fb: FormBuilder,
        private router: Router,
        private sharedService: SharedService,
        private util: UtilityService,
        private appPatientService: AppPatientService
    ) {
        this._unsubscribeAll = new Subject();

    }

    ngOnInit() {
        this.makePatientForm();
        this.setMedicines();
        this.subscribeToPrescription();
        this.checkRoute();
        this.setDoctor();
    }

    checkRoute() {
        this.route.params.subscribe(params => {
            this.currentPatientId = params['id'] ? params['id'] : null;
            if (this.currentPatientId != null) this.setPatientInfo();
        });
    }

    makePatientForm() {
        this.patientForm = this.fb.group({
            name: ['', [Validators.required]],
            sex: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            address: ['', [Validators.required]],
            clinicalRemarks: [''],
            diagnosis: ['', [Validators.required]],
            therapy: ['', [Validators.required]],
        });
        this.patientForm.updateValueAndValidity();
    }

    setMedicines() {
        this.appPatientService.getAllMedicines().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            this.medicines = res;
        })
    }

    subscribeToPrescription() {

        this.currentMedicine.valueChanges.subscribe(res => {
            this.prescriptions = this.originalPrescriptions;
            this.prescriptions = this.prescriptions.concat(res)
        })
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


    addPatient() {
        if (this.patientForm.valid) {
            if (this.currentPatientId) {
                let patient: Patient = this.patientForm.value;
                patient.id = this.currentPatientId;
                patient.clinicalRemarks = JSON.stringify(this.prescriptions);

                this.appPatientService.updatePatient(patient).pipe(first()).subscribe(res => {
                    this.openSnackBar(snackbarMessages.update_success, true);
                    this.resetPage(this.currentPatientId);


                })
            }
            else {
                let patient: Patient = this.patientForm.value;
                patient.clinicalRemarks = JSON.stringify(this.prescriptions);
                this.appPatientService.addPatient(patient).pipe(first()).subscribe(res => {
                    this.openSnackBar(snackbarMessages.add_success, true);
                    this.resetPage();
                })
            }

        }
    }

    resetPage(id?: string) {
        if (id) this.setPatientInfo();
        else {
            this.makePatientForm();
            this.originalPrescriptions = [];
            this.prescriptions = [];
            this.currentMedicine.setValue('');
        }

    }


    setPatientInfo() {
        this.appPatientService.getPatientById(this.currentPatientId).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            let patient: Patient = res;
            this.patientForm.patchValue({
                name: patient.name,
                sex: patient.sex,
                phone: patient.phone,
                address: patient.address,
                clinicalRemarks: patient.clinicalRemarks,
                diagnosis: patient.diagnosis,
                therapy: patient.therapy,
            });
            this.originalPrescriptions = JSON.parse(patient.clinicalRemarks);
            this.prescriptions = this.originalPrescriptions;

        })
    }

    delelePrescription(index) {
        this.prescriptions.splice(index, 1);
    }


    setDoctor() {
        this.appPatientService.getCurrentDoctor().pipe(first()).subscribe(res => {
            this.loggedInDoctor = res;
        })
    }



    exportAsPDF() {

        // for(let i=0;i<this.prescriptions;i++){
        //     console.log(i);
        // }

        let patient: Patient = this.patientForm.value;
        var doc = new jsPDF();
        doc.setFontSize(40);
        doc.setFont("courier", "bolditalic");
        doc.text(`${this.loggedInDoctor.hospitalName}`, 105, 30, null, "center");
        doc.setFontSize(25);
        doc.setFont("helvetica", "bold");
        doc.text("Doctor Name:", 20, 50);
        doc.setFontSize(20);
        doc.text(`${this.loggedInDoctor.doctorName}`, 20, 65);
        doc.setFontSize(15);
        doc.text(`${this.loggedInDoctor.designation}`, 20, 75);
        doc.setFontSize(25);
        doc.text("Patient Name:", 120, 50);
        doc.setFontSize(20);
        doc.text(`${patient.name}`, 120, 64);
        doc.setFontSize(15);
        doc.text(`Gender : ${patient.sex}`, 120, 75);
        doc.setFontSize(15);
        doc.text(`Address : ${patient.address}`, 120, 85);
        doc.line(0, 100, 250, 100); // horizontal line
        doc.setFontSize(50);
        doc.setFont("times", "bolditalic");
        doc.text("Rx", 20,130);
        doc.setFontSize(15);

        doc.setFont("times", "normal");
        
        let countY = 150;
        let countX=40;
        let loop = 0;
        for(let i of this.prescriptions){
            loop++;
            doc.text(`${loop}.`, countX, countY);
            doc.text(`Name: ${i.name}`, countX, countY+10);
            doc.text(`Indication: ${i.indication}`, countX, countY+20);
            doc.text(`Usage: ${i.usage}`, countX, countY+30);
            doc.text(`Instruction: ${i.instruction}`, countX, countY+40);
            countY+=50;
        }
        // doc.text("Medicine-1", 20, 150);
        // doc.text("Medicine-1", 20, 160);
        // doc.text("Medicine-1", 20, 170);
        // doc.text("Medicine-1", 20, 180);
        

        doc.save("Prescription.pdf");
        // var img = new Image();
        // img.src = 'assets/rx.png';


        //doc.addImage(img, 'PNG', 20, 110, 30, 30);
    }


    ngOnDestroy() {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
