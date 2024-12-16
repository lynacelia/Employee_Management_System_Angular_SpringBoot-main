import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

// Composants et services d'Employee
import { EmployeeListComponent } from './employe/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './employe/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './employe/update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './employe/employee-details/employee-details.component';
import { EmployeeService } from './employe/employee.service';

// Composants et services d'Entreprise
import { EntrepriseListComponent } from './entreprise/entreprise-list/entreprise-list.component';
import { CreateEntrepriseComponent } from './entreprise/create-entreprise/create-entreprise.component';
import { UpdateEntrepriseComponent } from './entreprise/update-entreprise/update-entreprise.component';
import { EntrepriseDetailsComponent } from './entreprise/entreprise-details/entreprise-details.component';
import { EntrepriseService } from './entreprise/entreprise.service'; 

// Modules d'Angular
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    // Composants d'Employee
    EmployeeListComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    EmployeeDetailsComponent,
    // Composants d'Entreprise
    EntrepriseListComponent,
    CreateEntrepriseComponent,
    UpdateEntrepriseComponent,
    EntrepriseDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    EmployeeService,  // Service pour Employee
    EntrepriseService // Service pour Entreprise
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
