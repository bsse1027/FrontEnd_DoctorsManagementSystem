import { QueryService } from '../../core/query-services/query.service';
import { SecurityService } from '../../core/security-services/security.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_path } from '../../config/apiRoutes/apiroutes';

@Injectable()
export class AppDoctorService {
    api_path = api_path;

    constructor(
        private coreQuery: QueryService,
        private securityService: SecurityService
    ) { }


    getAllDoctors(): Observable<any> {
        let httpHeader = this.securityService.getAuthorizedHeader();
        return this.coreQuery.httpGet(api_path.getDoctorAccounts, httpHeader);
    }
}
