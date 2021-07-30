import { Roles } from '../enums/clinicManagement.enum';

export interface User {
	username: string,
	token: string
}


export interface Doctor {
    id?:string;
	username: string,
	password?: string,
	doctorName: string,
	hospitalName: string,
	designation: string,
    passwordHash?:string,
    passwordSalt?:string
}

export interface Patient{
    id?:string,
    name:string,
    sex:string,
    phone:string,
    address:string,
    clinicalRemarks:string,
    diagnosis:string,
    therapy:string
}

export interface Medicine{
    medID?:string,
    name:string,
    indication:string,
    usage:string,
    instruction:string
}






export interface DialogData {
	title?:string;
	message?:string;
	input?:string;
	buttons:string[];
}


