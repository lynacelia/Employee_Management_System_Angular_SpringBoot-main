import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntrepriseService } from '../entreprise.service';
import { Entreprise } from '../entreprise';

@Component({
  selector: 'app-entreprise-details',
  templateUrl: './entreprise-details.component.html',
  styleUrls: ['./entreprise-details.component.css']
})
export class EntrepriseDetailsComponent implements OnInit {

  entreprise: Entreprise | null = null; // Initialisation avec null

  constructor(
    private route: ActivatedRoute,
    private entrepriseService: EntrepriseService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    
    // Appel à l'API pour récupérer les données de l'entreprise
    this.entrepriseService.getEntreprise(id).subscribe({
      next: (data) => this.entreprise = data, // Assignation des données récupérées à la propriété entreprise
      error: (err) => console.error('Erreur lors de la récupération de l\'entreprise', err)
    });
  }
}