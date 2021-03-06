import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from './security.service';
import { urlPaths, snackbarMessages } from '../../config/constants/clinicManagementConstants';
import { SharedService } from '../../shared/services/shared.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(
		private securityService: SecurityService,
		private router: Router,
		private sharedService: SharedService
	) {}

	canActivate(): Observable<boolean> {
		return new Observable((observer) => {
			this.securityService.isLoggedIn().subscribe((res) => {
				if (res) {
					observer.next(true);
				} else if (!res) {
					observer.next(false);
					this.openSnackBar(snackbarMessages.auth_failure, false);
					this.router.navigate([ urlPaths.Authentication.Signin.url ]);
				}
			});
		});
	}
	openSnackBar(message, isAccepted) {
		this.sharedService.openSnackBar({
			data: { message: message, isAccepted: isAccepted },
			duration: 2,
			panelClass: [ 'recovery-snackbar' ],
			horizontalPosition: 'right',
			verticalPosition: 'top'
		});
	}
}
