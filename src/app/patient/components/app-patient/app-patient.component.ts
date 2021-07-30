import { DialogComponent } from './../../../shared/components/dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Patient } from '../../../config/interfaces/clinicManagement.interface';
import { AppPatientService } from '../../services/app-patient.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './app-patient.component.html',
  styleUrls: ['./app-patient.component.scss']
})
export class AppPatientComponent implements OnInit {

    listData = new MatTableDataSource<Patient>();
    displayedColumns: string[] = ['name', 'phone', 'address', "diagnosis","therapy","star"];


    constructor(private appPatientService: AppPatientService,public dialog: MatDialog,private router:Router) { }

    ngOnInit() {
        this.setAllPatients();
    }

    setAllPatients() {
        this.appPatientService.getAllPatients().subscribe(res => {
            this.listData.data = res;
        })
    }

    applyFilter(filterValue: string) {
		this.listData.filter = filterValue.trim().toLowerCase();
	}

    openAddPatientModal(){
        this.router.navigate([`patient/detail`]);
    }

    openPatientModal(data:Patient){
        this.router.navigate([`patient/detail/${data.id}`]);
    }

    openPatientDeleteModal(patient:Patient){
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '600px',
            data: {title: "Delete Patient", message: `Are you sure to delete ${patient.name}?`,buttons:["Cancel","Confirm"]}
          });

          dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.deletePatient(patient.id);
            }
          });
    }

    deletePatient(id:string){
            this.appPatientService.deletePatientById(id).pipe(first()).subscribe(res=>{
                this.setAllPatients();
            })
    }
}
