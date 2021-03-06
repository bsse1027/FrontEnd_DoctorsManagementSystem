import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SharedService } from './services/shared.service';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material";
import { DialogComponent } from './components/dialog/dialog.component';
import {MatChipsModule} from '@angular/material/chips';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatSortModule} from '@angular/material/sort';
@NgModule({
  declarations: [SnackbarComponent, DialogComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFontAwesomeModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    NgxSpinnerModule,
    ShowHidePasswordModule,
    MatChipsModule,
    MatSortModule
  ],
  exports:[
    
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFontAwesomeModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    ShowHidePasswordModule,
    MatPaginatorModule,
    NgxSpinnerModule,
    MatChipsModule,
    MatSortModule
  ],
  providers:[SharedService],
  entryComponents:[SnackbarComponent,DialogComponent]
})
export class SharedModule { }
