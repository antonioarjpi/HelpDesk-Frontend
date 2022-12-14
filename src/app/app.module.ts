import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from '@angular/common/http';

// Imports para componentes do Angular Material
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDialogModule } from "@angular/material/dialog";

//Componentes
import { HeaderComponent } from "./components/header/header.component";
import { NavComponent } from "./components/nav/nav.component";
import { HomeComponent } from "./pages/home/home.component";
import { TechnicianComponent } from "./pages/technician/list/technician.component";
import { LoginComponent } from "./pages/login/login.component";
import { ToastrModule } from "ngx-toastr";
import { AuthInterceptorProvider } from "./interceptors/auth.interceptor";
import { TechnicianCreateComponent } from "./pages/technician/technician-create/technician-create.component";
import { TechnicianUpdateComponent } from './pages/technician/technician-update/technician-update.component';
import { TechnicianDeleteComponent } from './pages/technician/technician-delete/technician-delete.component';
import { ClientListComponent } from './pages/client/client-list/client-list.component';
import { ClientCreateComponent } from './pages/client/client-create/client-create.component';
import { ClientDeleteComponent } from './pages/client/client-delete/client-delete.component';
import { ClientUpdateComponent } from './pages/client/client-update/client-update.component';
import { CalledListComponent } from './pages/called/called-list/called-list.component';
import { CalledCreateComponent } from './pages/called/called-create/called-create.component';
import { CalledUpdateComponent } from './pages/called/called-update/called-update.component';
import { CalledViewComponent } from './pages/called/called-view/called-view.component';
import { NgxMaskModule } from 'ngx-mask';
import { ReportComponent } from './pages/report/report.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    TechnicianComponent,
    LoginComponent,
    TechnicianCreateComponent,
    TechnicianUpdateComponent,
    TechnicianDeleteComponent,
    ClientListComponent,
    ClientCreateComponent,
    ClientDeleteComponent,
    ClientUpdateComponent,
    CalledListComponent,
    CalledCreateComponent,
    CalledUpdateComponent,
    CalledViewComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Angular Material
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,

    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true,
    }),
    NgxMaskModule.forRoot(),

  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule { }
