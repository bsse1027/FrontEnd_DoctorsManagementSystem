import { api_path } from './../../config/apiRoutes/apiroutes';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UtilityService } from '../../core/utility-services/utility-service.service';
import { Observable, } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { httpHeader, localStorageKeys } from '../../config/constants/clinicManagementConstants';
import { loginCredentials } from '../../config/interfaces/configurations.interface';
import { User, Doctor } from '../../config/interfaces/clinicManagement.interface';
import { MutationService } from '../../core/mutation-services/mutation.service';
import { SecurityService } from '../../core/security-services/security.service';

@Injectable()
export class AuthenticationService {
    api_paths = api_path;
    constructor(
        private util: UtilityService,
        private coreMutate: MutationService
    ) { }

    touchAllfields(group: FormGroup) {
        this.util.touchAllFieldsOfForm(group);
    }


    signUpAccount(register: Doctor): Observable<any> {
        return this.coreMutate.httpPost(`${api_path.registerDoctorAccount}`, register, httpHeader);
    }



    signInAccount(login: loginCredentials): Observable<any> {

        return this.coreMutate.httpPost(`${api_path.loginWithUsernamePassword}`, login, httpHeader);
    }


    setSession(user: User) {
        this.coreMutate.setJSONDataInLocalStorage(localStorageKeys.User, user);
        this.coreMutate.setDataInLocalStorage(localStorageKeys.Token, user.token);
    }
}
