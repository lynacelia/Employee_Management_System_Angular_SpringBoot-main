import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entreprise } from '../entreprise';  // Assurez-vous d'importer le modèle Entreprise
import { EntrepriseService } from '../entreprise.service';  // Assurez-vous d'importer le service EntrepriseService

@Component({
  selector: 'app-create-entreprise',
  templateUrl: './create-entreprise.component.html',
  styleUrls: ['./create-entreprise.component.css'],
})
export class CreateEntrepriseComponent implements OnInit {
  entreprise: Entreprise = new Entreprise();  // Utilisation du modèle Entreprise
  nomInvalid: boolean = false;  // Indicateur pour l'erreur sur le nom
  adresseInvalid: boolean = false;  // Indicateur pour l'erreur sur l'adresse
  nomErrorMessage: string = '';  // Message d'erreur pour le nom
  adresseErrorMessage: string = '';  // Message d'erreur pour l'adresse

  constructor(
    private entrepriseService: EntrepriseService,  // Utilisation du service EntrepriseService
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Méthode pour enregistrer une nouvelle entreprise
  saveEntreprise() {
    this.entrepriseService.createEntreprise(this.entreprise).subscribe(
      (data) => {
        console.log(data);  // Affiche la réponse de l'API dans la console
        this.goToEntrepriseList();  // Redirige vers la liste des entreprises
      },
      (error) => console.log(error)  // Affiche les erreurs dans la console
    );
  }

  // Méthode de redirection vers la liste des entreprises après la soumission
  goToEntrepriseList() {
    this.router.navigate(['/entreprises']);
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    // Réinitialisation des erreurs
    this.nomInvalid = false;
    this.adresseInvalid = false;
    this.nomErrorMessage = '';
    this.adresseErrorMessage = '';

    // Validation des champs
    // Le nom ne doit pas être un entier pur
    if (!this.entreprise.nom || /^\d+$/.test(this.entreprise.nom)) {
      this.nomInvalid = true;
      this.nomErrorMessage = 'Le nom de l\'entreprise ne peut pas être un nombre.';
    }
    // Vérifie si le nom est vide
    else if (!this.entreprise.nom.trim()) {
      this.nomInvalid = true;
      this.nomErrorMessage = 'Le nom de l\'entreprise doit être rempli.';
    }

    // L'adresse doit être une chaîne non vide
    if (!this.entreprise.adresse || this.entreprise.adresse.trim() === '') {
      this.adresseInvalid = true;
      this.adresseErrorMessage = 'L\'adresse de l\'entreprise doit être remplie.';
    }

    // Si un champ est invalide, ne pas soumettre
    if (this.nomInvalid || this.adresseInvalid) {
      console.log('Formulaire invalide');  // Avertit que le formulaire est invalide
      return;
    }

    // Si tout est valide, soumettre
    console.log(this.entreprise);  // Affiche les données de l'entreprise dans la console
    this.saveEntreprise();  // Enregistre l'entreprise
  }
}
