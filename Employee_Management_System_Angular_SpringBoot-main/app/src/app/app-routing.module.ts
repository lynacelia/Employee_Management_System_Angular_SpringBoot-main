import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import des composants pour les employés
import { EmployeeListComponent } from './employe/employee-list/employee-list.component'; 
import { CreateEmployeeComponent } from './employe/create-employee/create-employee.component'; 
import { UpdateEmployeeComponent } from './employe/update-employee/update-employee.component'; 
import { EmployeeDetailsComponent } from './employe/employee-details/employee-details.component'; 

// Import des composants pour les entreprises
import { EntrepriseListComponent } from './entreprise/entreprise-list/entreprise-list.component'; 
import { CreateEntrepriseComponent } from './entreprise/create-entreprise/create-entreprise.component'; 
import { UpdateEntrepriseComponent } from './entreprise/update-entreprise/update-entreprise.component'; 
import { EntrepriseDetailsComponent } from './entreprise/entreprise-details/entreprise-details.component'; 

const routes: Routes = [
  // Routes pour les employés
  { path: 'employees', component: EmployeeListComponent }, 
  { path: 'create-employee', component: CreateEmployeeComponent }, 
  { path: '', redirectTo: 'employees', pathMatch: 'full' }, 
  { path: 'update-employee/:id', component: UpdateEmployeeComponent },
  { path: 'employee-details/:id', component: EmployeeDetailsComponent },

  // Routes pour les entreprises
  { path: 'entreprises', component: EntrepriseListComponent }, 
  { path: 'create-entreprise', component: CreateEntrepriseComponent }, 
  { path: 'update-entreprise/:id', component: UpdateEntrepriseComponent },
  { path: 'entreprise-details/:id', component: EntrepriseDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

