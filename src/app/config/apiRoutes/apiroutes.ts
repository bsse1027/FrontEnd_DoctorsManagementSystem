import {environment} from '../../../environments/environment';


export const api_path = {
  baseURL: environment.baseurl,

  // Doctor signup
  registerDoctorAccount: `${environment.baseurl}/api/account/register`,

  //Login
  loginWithUsernamePassword: `${environment.baseurl}/api/account/login`,

  getDoctorAccounts: `${environment.baseurl}/api/account`,
  updateDoctorAccount: `${environment.baseurl}/api/account`,

  getPatientAccounts: `${environment.baseurl}/api/patient`,

  deletePatientAccount: `${environment.baseurl}/api/patient`,

  addPatientAccount: `${environment.baseurl}/api/patient`,
  updatePatientAccount: `${environment.baseurl}/api/patient`,



  getMedicines:`${environment.baseurl}/api/medicine`,
  addMedicine:`${environment.baseurl}/api/medicine/add`,

  deleteMedicine:`${environment.baseurl}/api/medicine`,
  

  
}
