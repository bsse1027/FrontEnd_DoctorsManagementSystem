import { Doctor } from './../../config/interfaces/clinicManagement.interface';
import { SecurityService } from 'src/app/core/security-services/security.service';
import { QueryService } from '../../core/query-services/query.service';
import { MutationService } from './../../core/mutation-services/mutation.service';
import { UtilityService } from './../../core/utility-services/utility-service.service';
import { Injectable } from '@angular/core';
import { api_path } from '../../config/apiRoutes/apiroutes';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppProfileService {

    api_path = api_path;

    constructor(
        private util: UtilityService,
        private coreMutate: MutationService,
        private coreQuery: QueryService,
        private securityService: SecurityService
    ) { }

    getCurrentDoctor(): Observable<any> {
        let httpHeader = this.securityService.getAuthorizedHeader();
        const username = this.securityService.getLoggedInUsername();
        return this.coreQuery.httpGet(api_path.getDoctorAccounts, httpHeader).pipe(map(res => {
            return res.filter(x => x.username == username)[0];
        }));
    }

    updateCurrentDoctor(payload: Doctor) :Observable<any> {
        let httpHeader = this.securityService.getAuthorizedHeader();
        return this.coreMutate.httpPut(`${api_path.updateDoctorAccount}/${payload.id}`, payload, httpHeader)
    }



}
