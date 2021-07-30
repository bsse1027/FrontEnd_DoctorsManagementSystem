import { Doctor } from './../../../config/interfaces/clinicManagement.interface';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { AppDoctorService } from '../../services/app-doctor.service';

@Component({
    selector: 'app-doctor',
    templateUrl: './app-doctor.component.html',
    styleUrls: ['./app-doctor.component.scss']
})
export class AppDoctorComponent implements OnInit {
    listData = new MatTableDataSource<Doctor>();
    displayedColumns: string[] = ['username', 'doctorName', 'hospitalName', "designation"];


    constructor(private appDoctorService: AppDoctorService) { }

    ngOnInit() {
        this.setAllDoctors();
    }

    setAllDoctors() {
        this.appDoctorService.getAllDoctors().subscribe(res => {
            this.listData.data = res;
        })
    }

    applyFilter(filterValue: string) {
		this.listData.filter = filterValue.trim().toLowerCase();
        console.log();
	}

    

}
