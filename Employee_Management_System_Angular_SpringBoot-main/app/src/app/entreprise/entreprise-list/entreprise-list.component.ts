import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from '../entreprise.service';
import { Entreprise } from '../entreprise';

@Component({
  selector: 'app-entreprise-list',
  templateUrl: './entreprise-list.component.html',
  styleUrls: ['./entreprise-list.component.css']
})
export class EntrepriseListComponent implements OnInit {

  entreprises: Entreprise[] = []; // Initialisation avec un tableau vide

  constructor(private entrepriseService: EntrepriseService) { }

  ngOnInit(): void {
    this.entrepriseService.getEntreprises().subscribe({
      next: (data) => this.entreprises = data,
      error: (err) => console.error('Erreur lors de la récupération des entreprises', err)
    });
  }
}

