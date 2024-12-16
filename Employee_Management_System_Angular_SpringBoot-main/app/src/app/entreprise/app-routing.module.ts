import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import des composants pour les entreprises
import { EntrepriseListComponent } from './entreprise-list/entreprise-list.component'; // Liste des entreprises
import { CreateEntrepriseComponent } from './create-entreprise/create-entreprise.component'; // Création d'entreprise
import { UpdateEntrepriseComponent } from './update-entreprise/update-entreprise.component'; // Modification d'entreprise
import { EntrepriseDetailsComponent } from './entreprise-details/entreprise-details.component'; // Détails de l'entreprise

const routes: Routes = [
  { path: 'entreprises', component: EntrepriseListComponent }, // Liste des entreprises
  { path: 'create-entreprise', component: CreateEntrepriseComponent }, // Création d'entreprise
  { path: '', redirectTo: 'entreprises', pathMatch: 'full' }, // Redirection vers la liste des entreprises
  { path: 'update-entreprise/:id', component: UpdateEntrepriseComponent }, // Modification d'entreprise
  { path: 'entreprise-details/:id', component: EntrepriseDetailsComponent }, // Détails de l'entreprise
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
