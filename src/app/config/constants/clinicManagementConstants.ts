import { HttpHeaders } from '@angular/common/http';
import { Token_Role } from '../enums/clinicManagement.enum';

export const clinicManagementConst = {
    DefaultSideBar: [
        {
            name: 'Home',
            url: 'home',
            icon: 'home'
        },

        {
            name: 'Query Transaction',
            url: 'transaction/query',
            icon: 'search'
        }
    ],

    DoctorSidebar: [
        
        {
            name: 'Profile',
            url: 'profile',
            icon: 'dashboard'
        },
        {
            name: 'Doctor List',
            url: 'doctor',
            icon: 'groups'
        },
        {
            name: 'Patient',
            url: 'patient',
            icon: 'accessible'
        },
        {
            name: 'Medicine',
            url: 'medicine',
            icon: 'medical_services'
        }
    ],

    PatientSidebar: [
        
        {
            name: 'Profile',
            url: 'user/profile',
            icon: 'dashboard'
        }
    ],
    sideBar: [
        

        {
            name: 'Profile',
            url: 'profile',
            icon: 'dashboard',
            role: [Token_Role.ROLE_DOCTOR],
            mini_name: 'Profile'


        },
        {
            name: 'Doctor',
            url: 'doctor',
            icon: 'groups',
            role: [Token_Role.ROLE_DOCTOR],
            mini_name: 'Doctor'

        },
        {
            name: 'Patient',
            url: 'patient',
            icon: 'accessible',
            role: [Token_Role.ROLE_DOCTOR],
            mini_name: 'Patient'
        },
        {
            name: 'Medicine',
            url: 'medicine',
            icon: 'medical_services',
            role: [Token_Role.ROLE_DOCTOR],
            mini_name: 'Medicine'
        }
    ],
    siteName: {
        name: 'DMS'
    },
    menu: {
        profile: {
            name: 'My Profile',
            url: 'profile'
        },
        logout: {
            name: 'Logout',
            url: 'sign-in'
        }
       

    },
    username: {
        name: 'Login',
        url: 'authentication/sign-in'
    }

};
// export const passwordRegex = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';
export const passwordRegex = '.{8,}$';
export const integerRegex = '/^\d+$/';

export const authentication_error_messages = {
    empty_name: 'Please provide your name',
    email_error: 'Invalid email',
    email_required: 'Email is required',
    username_required: 'User name is required',
    weak_password: 'Password should be at least 8 characters',
    password_mismatch: 'Password does not match',
    password_required: 'Password is required',
    phone_number_error: 'Provide phone number',
    username_error: 'Provide valid username',
    required_field: 'Required field',
    minimum_5: 'Minimum 5 length is required',
    maximum_20: 'Maximum length is 20',

};

export const snackbarMessages = {
    email_sent: 'Email sent successfully',
    login: 'Logged in successfully',
    login_failed: 'Email or password do not match',
    otp_verified: 'OTP verified',
    email_exists: 'Email already exists in our system',
    otp_failed: 'OTP verification failed',
    check_email_for_verification: 'Check email for verification',
    registration_complete: 'Registration Complete',
    try_again: 'Please try again',
    auth_failure: 'Must login to continue',
    access_denied: 'Access Denied',
    must_be_admin: 'You need Admin permission',
    reset_password_complete: 'Password reset successful',
    change_password_success: 'Password has been changed successfully',
    change_password_fail: 'Password change has been failed',
    selected_merchant_notification_sent_success: 'Notification has been sent',
    selected_merchant_notification_sent_fail: 'Notification sent has been failed',
    withdraw_success: 'Request sent successfully',
    update_success: 'Updated successfully',
    add_success: 'Added successfully',

    not_allowed: 'Not allowed'
};

export const withdrawErrorMessages = {
    required_amount: 'Please enter a valid amount',
    insufficient_amount: 'You do not have enough balance',
    select_account: 'Select one of your account',
    greater_than_20000: 'Have to be less than 20000 BDT',
    less_than_0: 'Cannot enter negative value',
    select_wallet: 'Select a wallet',
    password_required: 'Enter password'


}

export const urlPaths = {
    Authentication: {
        Signin: {
            url: 'authentication/sign-in'
        },
        Signup: {
            url: 'authentication/doctor-signup'
        }
    },
    Home: {
        HomeDefault: {
            url: 'home'
        }
    },
    Doctor:{
        DoctorDefault: {
            url: 'doctor'
        }
    },
    Profile: {
        profile: {
            url: 'profile'
        }
    }
};

export const httpHeader = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'

    })
};
export const httpHeaderLogin = {
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/x-www-form-urlencoded'

    })
};


export const httpOptionsText: Object = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }),


};
export const httpOptionsJson = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};


export const localStorageKeys = {
    ClinicManagementSignUp: 'ClinicManagementSignUp',
    User: 'User',
    Token: 'Token',

}


export const fileSize = {
    size: 2000000
}
