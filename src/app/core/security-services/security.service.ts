import { Token_Role } from './../../config/enums/clinicManagement.enum';
import { Params } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../../config/interfaces/clinicManagement.interface';
import { Roles } from '../../config/enums/clinicManagement.enum';
import { Observable } from 'rxjs';
import { QueryService } from '../query-services/query.service';
import { localStorageKeys } from '../../config/constants/clinicManagementConstants';
import { first } from "rxjs/operators";
import { UtilityService } from "../utility-services/utility-service.service";
import { HttpHeaders } from "@angular/common/http";
// import {Headers} from '@angular/common/http'
@Injectable({
    providedIn: 'root'
})
export class SecurityService {
    constructor(private queryservice: QueryService,
        private utilityService: UtilityService
    ) { }


    isLoggedIn(): Observable<boolean> {
        return new Observable((observer) => {
            let user: User = this.queryservice.readJSONValueFromLocalStorage(localStorageKeys.User);
            let token = this.queryservice.readValueFromLocalStorage(localStorageKeys.Token);

            if (user && this.utilityService.isValidToken(token)) {
                observer.next(true);
            } else {
                observer.next(false);
            }
        });
    }

    getRole(): Observable<any> {
        return new Observable(observer => {
            let user: User = this.queryservice.readJSONValueFromLocalStorage(localStorageKeys.User);
            let token = this.queryservice.readValueFromLocalStorage(localStorageKeys.Token);
            if (user && this.utilityService.isValidToken(token)) {
                observer.next(Roles.DOCTOR);
            } else {
                observer.next(Roles.anonymousUser);
            }

        })
    }

    getHeader(Token: any): any {

        let httpheader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`
        });

        let httpOptions = {
            headers: httpheader
        }

        return httpOptions;
    }
    getHeaderWithQueryParams(Token: any, params): any {

        let httpheader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`
        });

        let httpOptions = {
            headers: httpheader,
            params: params
        }

        return httpOptions;
    }

    getTokenRole(): Observable<any> {
        return new Observable((observer) => {
            this.queryservice.getToken().pipe(first()).subscribe(
                (response) => {
                    if (this.utilityService.isValidToken(response)) {

                        observer.next(Token_Role.ROLE_DOCTOR)
                    }
                    else {
                        observer.next(null);

                    }
                },
                (err) => {
                    observer.error(err);
                }
            );
        });
    }

    getCurrentUser(): Observable<any> {
        return new Observable(observer => {
            let user: User = this.queryservice.readJSONValueFromLocalStorage(localStorageKeys.User);
            if (user) {
                observer.next(user);
            } else {
                observer.next(null);
            }
        })
    }

    getAuthorizedHeader() {
        let token = this.queryservice.getTokenDirect();
        let header = this.getHeader(token);
        return header;
    }
    getAuthorizedQueryParamsHeader(params) {
        let token = this.queryservice.getTokenDirect();
        let header = this.getHeaderWithQueryParams(token, params);
        return header;
    }

    getLoggedInUserId() {
        let user = this.queryservice.getLoggedInUser();
        if (user && user.id) {
            return user.id;
        }
        return null;
    }
    getLoggedInUsername() {
        let user = this.queryservice.getLoggedInUser();
        if (user && user.username) {
            return user.username;
        }
        return null;
    }

    getLoggedInUserRole() {
        let user = this.queryservice.getLoggedInUser();
        if (user && user.role) {
            return user.role;
        }
        return null;
    }


    getLoggedinEmail() {
        let user = this.queryservice.readJSONValueFromLocalStorage(localStorageKeys.User);
        if (user && user.email) {
            return user.email;
        }
        return null;
    }

}
