import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrepriseService } from '../entreprise.service';
import { Entreprise } from '../entreprise';

@Component({
  selector: 'app-update-entreprise',
  templateUrl: './update-entreprise.component.html',
  styleUrls: ['./update-entreprise.component.css']
})
export class UpdateEntrepriseComponent implements OnInit {

  entreprise: Entreprise | null = null; // Initialisation avec null

  constructor(
    private route: ActivatedRoute,
    private entrepriseService: EntrepriseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.entrepriseService.getEntreprise(id).subscribe({
      next: (data) => this.entreprise = data,
      error: (err) => console.error('Erreur lors de la récupération de l\'entreprise', err)
    });
  }

  updateEntreprise(): void {
    if (this.entreprise) {
      this.entrepriseService.updateEntreprise(this.entreprise.id, this.entreprise).subscribe({
        next: (data) => {
          console.log('Entreprise mise à jour', data);
          this.router.navigate(['/entreprise-list']);
        },
        error: (err) => console.error('Erreur lors de la mise à jour', err)
      });
    }
  }
}
