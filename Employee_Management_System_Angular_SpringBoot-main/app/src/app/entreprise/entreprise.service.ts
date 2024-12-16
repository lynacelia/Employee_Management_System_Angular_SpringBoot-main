import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entreprise } from './entreprise';

@Injectable({
  providedIn: 'root',
})
export class EntrepriseService {
  private baseURL = 'http://localhost:8080/api/v1/entreprises';  // Remplacer par l'URL de ton API des entreprises

  constructor(private httpClient: HttpClient) {}

  // Récupérer la liste des entreprises
  getEntreprises(): Observable<Entreprise[]> {
    return this.httpClient.get<Entreprise[]>(`${this.baseURL}`);
  }

  // Créer une entreprise
  createEntreprise(entreprise: Entreprise): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, entreprise);
  }

  // Récupérer une entreprise par son ID
  getEntreprise(id: number): Observable<Entreprise> {
    return this.httpClient.get<Entreprise>(`${this.baseURL}/${id}`);
  }

  // Mettre à jour une entreprise
  updateEntreprise(id: number, entreprise: Entreprise): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, entreprise);
  }

  // Supprimer une entreprise
  deleteEntreprise(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
