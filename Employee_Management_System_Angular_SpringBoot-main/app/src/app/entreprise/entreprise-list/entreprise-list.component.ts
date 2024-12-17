import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entreprise } from '../entreprise';
import { EntrepriseService } from '../entreprise.service';

@Component({
  selector: 'app-entreprise-list',
  templateUrl: './entreprise-list.component.html',
  styleUrls: ['./entreprise-list.component.css'],
})
export class EntrepriseListComponent implements OnInit {
  entreprises!: Entreprise[]; // Liste des entreprises
  message: string = ''; // Message pour l'interface utilisateur (confirmation ou erreur)

  constructor(
    private entrepriseService: EntrepriseService, // Injection du service EntrepriseService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEntreprises(); // Appel à la méthode pour récupérer les entreprises au démarrage du composant
  }

  // Méthode pour récupérer la liste des entreprises
  private getEntreprises() {
    this.entrepriseService.getEntreprises().subscribe({
      next: (data) => {
        this.entreprises = data;
        this.sortEntreprisesById(); // Applique le tri après récupération
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des entreprises:', err);
        this.message = 'Une erreur est survenue lors de la récupération des entreprises.';
      }
    });
  }

  // Méthode pour trier les entreprises en fonction de l'ID décroissant
  private sortEntreprisesById() {
    // S'assurer que l'ID est un nombre et trier les entreprises par ID décroissant
    this.entreprises.sort((a, b) => {
      return (b.id || 0) - (a.id || 0); // Assurez-vous que les ID sont bien numériques
    });
  }

  // Méthode pour afficher les détails d'une entreprise
  entrepriseDetails(id: number) {
    this.router.navigate(['entreprise-details', id]);
  }

  // Méthode pour rediriger vers la page de mise à jour d'une entreprise
  updateEntreprise(id: number) {
    this.router.navigate(['update-entreprise', id]);
  }

  // Méthode pour supprimer une entreprise
  deleteEntreprise(id: number) {
      this.entrepriseService.deleteEntreprise(id).subscribe({
        next: (data) => {
          console.log('Entreprise supprimée:', data);
          this.getEntreprises(); // Actualise la liste après suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de l\'entreprise:', err);
          this.message = 'Une erreur est survenue lors de la suppression de l\'entreprise.';
        }
      });

  }
}
