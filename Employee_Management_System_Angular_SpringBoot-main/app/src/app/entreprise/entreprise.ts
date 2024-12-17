export class Entreprise {
  id?: number;
  nom: string;  // Le nom de l'entreprise doit être une chaîne de caractères
  adresse: string;  // L'adresse doit être une chaîne de caractères

  constructor() {
    this.nom = '';
    this.adresse = '';
  }
}
