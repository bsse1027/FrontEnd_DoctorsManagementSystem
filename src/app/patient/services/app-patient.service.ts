import { Patient } from './../../config/interfaces/clinicManagement.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MutationService } from 'src/app/core/mutation-services/mutation.service';
import { api_path } from '../../config/apiRoutes/apiroutes';
import { QueryService } from '../../core/query-services/query.service';
import { SecurityService } from '../../core/security-services/security.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AppPatientService {
    api_path = api_path;

    constructor(private coreQuery: QueryService,
        private coreMutate:MutationService,
        private securityService: SecurityService) { }

    getAllPatients(): Observable<any> {
        let httpHeader = this.securityService.getAuthorizedHeader();
        return this.coreQuery.httpGet(api_path.getPatientAccounts, httpHeader);
    }

    deletePatientById(id:string):Observable<any>{
        let httpHeader = this.securityService.getAuthorizedHeader();
        return this.coreMutate.httpDelete(`${api_path.deletePatientAccount}/${id}`, httpHeader);
    }

    addPatient(payload:Patient):Observable<any>{
        let httpHeader = this.securityService.getAuthorizedHeader();
        return this.coreMutate.httpPost(`${api_path.addPatientAccount}`,payload, httpHeader);

    }

    updatePatient(payload:Patient):Observable<any>{
        let httpHeader = this.securityService.getAuthorizedHeader();
        return this.coreMutate.httpPut(`${api_path.updatePatientAccount}/${payload.id}`,payload, httpHeader);

    }

    getAllMedicines(): Observable<any> {
        let httpHeader = this.securityService.getAuthorizedHeader();
        return this.coreQuery.httpGet(api_path.getMedicines, httpHeader);
    }

    getPatientById(id):Observable<any>{
        let httpHeader = this.securityService.getAuthorizedHeader();
        return this.coreQuery.httpGet(`${api_path.getPatientAccounts}/${id}`, httpHeader);
    }

    getCurrentDoctor(): Observable<any> {
        let httpHeader = this.securityService.getAuthorizedHeader();
        const username = this.securityService.getLoggedInUsername();
        return this.coreQuery.httpGet(api_path.getDoctorAccounts, httpHeader).pipe(map(res => {
            return res.filter(x => x.username == username)[0];
        }));
    }
    
}
