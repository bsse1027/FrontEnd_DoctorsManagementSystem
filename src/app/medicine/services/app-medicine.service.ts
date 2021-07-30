import { SecurityService } from './../../core/security-services/security.service';
import { MutationService } from './../../core/mutation-services/mutation.service';
import { QueryService } from './../../core/query-services/query.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_path } from '../../config/apiRoutes/apiroutes';

@Injectable()
export class AppMedicineService {

    api_path = api_path;

    constructor(private coreQuery: QueryService,
        private coreMutate: MutationService,
        private securityService: SecurityService) { }

    getAllMedicines(): Observable<any> {
        let httpHeader = this.securityService.getAuthorizedHeader();
        return this.coreQuery.httpGet(api_path.getMedicines, httpHeader);
    }

    deleteMedicineById(id: string): Observable<any> {
        let httpHeader = this.securityService.getAuthorizedHeader();
        return this.coreMutate.httpDelete(`${api_path.deleteMedicine}/${id}`, httpHeader);
    }

    addMedicine(payload): Observable<any> {
        let httpHeader = this.securityService.getAuthorizedHeader();
        return this.coreMutate.httpPost(`${api_path.addMedicine}`, payload, httpHeader);

    }
}
