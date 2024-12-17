import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrepriseService } from '../entreprise.service'; // Service pour les entreprises
import { Entreprise } from '../entreprise'; // Modèle Entreprise

@Component({
  selector: 'app-update-entreprise',
  templateUrl: './update-entreprise.component.html',
  styleUrls: ['./update-entreprise.component.css'],
})
export class UpdateEntrepriseComponent implements OnInit {
  id!: number; // ID de l'entreprise
  entreprise: Entreprise = new Entreprise(); // Initialisation d'un objet entreprise vide
  nomInvalid: boolean = false; // Indicateur pour le nom invalide
  adresseInvalid: boolean = false; // Indicateur pour l'adresse invalide
  nomErrorMessage: string = ''; // Message d'erreur pour le nom
  adresseErrorMessage: string = ''; // Message d'erreur pour l'adresse

  constructor(
    private entrepriseService: EntrepriseService, // Injection du service EntrepriseService
    private route: ActivatedRoute, // Permet de récupérer l'ID de l'URL
    private router: Router // Permet de naviguer après la mise à jour
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; // Récupération de l'ID depuis l'URL

    this.entrepriseService.getEntreprise(this.id).subscribe(
      (data) => {
        this.entreprise = data; // Assignation des données de l'entreprise récupérées
      },
      (error) => console.log(error) // Gestion des erreurs
    );
  }

  onSubmit(): void {
    // Réinitialisation des erreurs
    this.nomInvalid = false;
    this.adresseInvalid = false;
    this.nomErrorMessage = '';
    this.adresseErrorMessage = '';

    // Validation des champs
    if (!this.entreprise.nom || this.entreprise.nom.trim() === '') {
      this.nomInvalid = true;
      this.nomErrorMessage = 'Le nom de l\'entreprise doit être rempli.';
    } else if (/^\d+$/.test(this.entreprise.nom)) {
      this.nomInvalid = true;
      this.nomErrorMessage = 'Le nom de l\'entreprise ne peut pas être un nombre.';
    } else {
      this.nomInvalid = false;
      this.nomErrorMessage = '';
    }
    

    if (!this.entreprise.adresse || this.entreprise.adresse.trim() === '') {
      this.adresseInvalid = true;
      this.adresseErrorMessage = 'L\'adresse de l\'entreprise doit être remplie.';
    }

    // Si un champ est invalide, ne pas soumettre
    if (this.nomInvalid || this.adresseInvalid) {
      console.log('Formulaire invalide'); // Log si le formulaire est invalide
      return;
    }

    // Si tout est valide, soumettre
    this.entrepriseService.updateEntreprise(this.id, this.entreprise).subscribe(
      (data) => {
        this.goToEntrepriseList(); // Redirection vers la liste des entreprises
      },
      (error) => console.log(error) // Gestion des erreurs
    );
  }

  // Méthode pour rediriger vers la liste des entreprises
  goToEntrepriseList() {
    this.router.navigate(['/entreprises']);
  }
}
