import { DialogComponent } from './../../../shared/components/dialog/dialog.component';
import { AppMedicineService } from './../../services/app-medicine.service';
import { Medicine } from './../../../config/interfaces/clinicManagement.interface';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppMedicineDetailComponent } from '../app-medicine-detail/app-medicine-detail.component';

@Component({
  selector: 'app-medicine',
  templateUrl: './app-medicine.component.html',
  styleUrls: ['./app-medicine.component.scss']
})
export class AppMedicineComponent implements OnInit {

    listData = new MatTableDataSource<Medicine>();
    displayedColumns: string[] = ['name', 'indication', 'usage', "instruction","star"];


    constructor(private appMedicineService: AppMedicineService,public dialog: MatDialog,private router:Router) { }

    ngOnInit() {
        this.setAllMedicines();
    }

    setAllMedicines() {
        this.appMedicineService.getAllMedicines().subscribe(res => {
            this.listData.data = res;
        })
    }

    applyFilter(filterValue: string) {
		this.listData.filter = filterValue.trim().toLowerCase();
	}

    openAddMedicineModal(){
        const dialogRef = this.dialog.open(AppMedicineDetailComponent, {
            // width: '600px',
            // data: {title: "Delete Medicine", message: `Are you sure to delete ${Medicine.name}?`,buttons:["Cancel","Confirm"]}
          });
          dialogRef.afterClosed().subscribe(result => {
            this.setAllMedicines();

          });
    }

    

    openMedicineDeleteModal(Medicine:Medicine){
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '600px',
            data: {title: "Delete Medicine", message: `Are you sure to delete ${Medicine.name}?`,buttons:["Cancel","Confirm"]}
          });

          dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.deleteMedicine(Medicine.medID);
            }
          });
    }

    deleteMedicine(id:string){
            this.appMedicineService.deleteMedicineById(id).pipe(first()).subscribe(res=>{
                this.setAllMedicines();
            })
    }

}
