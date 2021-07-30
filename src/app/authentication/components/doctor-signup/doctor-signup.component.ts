import { clinicManagementConst, snackbarMessages, localStorageKeys } from '../../../config/constants/clinicManagementConstants';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { passwordRegex, authentication_error_messages, urlPaths } from '../../../config/constants/clinicManagementConstants';
import { FieldMatcher, UtilityService } from '../../../core/utility-services/utility-service.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Doctor } from '../../../config/interfaces/clinicManagement.interface';
import { QueryService } from '../../../core/query-services/query.service';
import { MutationService } from '../../../core/mutation-services/mutation.service';
import { SharedService } from '../../../shared/services/shared.service';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
	selector: 'app-doctor-signup',
	templateUrl: './doctor-signup.component.html',
	styleUrls: [ './doctor-signup.component.scss' ]
})
export class DoctorSignupComponent implements OnInit {
	constructor(
		private fb: FormBuilder,
		private authService: AuthenticationService,
		private router: Router,
		private coreQuery: QueryService,
		private coreMutate: MutationService,
		private sharedService: SharedService,
		private util: UtilityService
	) {}

	// Localstorage Object
	

	// Progress bar
	isSignUpLoading = false;


	// Forms
	signupform: FormGroup;
	matcher;
	error_messages = authentication_error_messages;
	snackbarMessages = snackbarMessages;
	urlPaths = urlPaths;



	ngOnInit() {
		this.makeSignupFormDoctor();
		this.setCustomValidation();
	}

	


	makeSignupFormDoctor() {
		this.signupform = this.fb.group({
			name: [ '', [ Validators.required ] ],
			username: [ '', [ Validators.required ] ],
			hospitalname: [ '', [ Validators.required ] ],
			designation: [ '', [ Validators.required ] ],
			password: [ '', [ Validators.required, Validators.pattern(passwordRegex) ] ],
			confirm_password: [ '', [ Validators.required, Validators.pattern(passwordRegex) ] ],
		});
	}
	
	// Matching password and confirm password
	passwordMatchValidator(group: FormGroup): any {
		if (group) {
			if (group.get('password').value !== group.get('confirm_password').value) {
				return { not_matching: true };
			}
		}

		return null;
	}

	setCustomValidation() {
		this.signupform.setValidators(this.passwordMatchValidator);
		
		this.signupform.updateValueAndValidity();
		this.matcher = new FieldMatcher();
	}

	onSignupSubmit() {
		this.isSignUpLoading = true;
		if (this.signupform.valid ) {
			let doctor: Doctor = {
				username: this.signupform.value.username,
				doctorName: this.signupform.value.name,
				hospitalName: this.signupform.value.hospitalname,
				designation: this.signupform.value.designation,
				password: this.signupform.value.password,
			};

			this.authService.signUpAccount(doctor).pipe(first()).subscribe(
				(res) => {
                    
					this.openSnackBar(this.util.toCapitalize(snackbarMessages.registration_complete), true);

                    this.isSignUpLoading = false;
                    this.route(urlPaths.Authentication.Signin.url);
				},
				(err) => {

					let message = this.util.giveErrorMessage(err);
					this.openSnackBar(this.util.toCapitalize(message), false);
					this.isSignUpLoading = false;
				}
			);
		} else {
			this.authService.touchAllfields(this.signupform);
			this.isSignUpLoading = false;
		}
	}






	route(path) {
		this.router.navigate([ path ]);
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
