import { Component } from '@angular/core';
import { EntrepriseService } from '../entreprise.service';
import { Router } from '@angular/router';
import { Entreprise } from '../entreprise';

@Component({
  selector: 'app-create-entreprise',
  templateUrl: './create-entreprise.component.html',
  styleUrls: ['./create-entreprise.component.css']
})
export class CreateEntrepriseComponent {

  entreprise: Entreprise = new Entreprise();

  constructor(private entrepriseService: EntrepriseService, private router: Router) { }

  createEntreprise(): void {
    this.entrepriseService.createEntreprise(this.entreprise).subscribe({
      next: (data) => {
        console.log('Entreprise créée', data);
        this.router.navigate(['/entreprise-list']);  // Redirige vers la liste des entreprises
      },
      error: (err) => console.error('Erreur lors de la création', err)
    });
  }
}
