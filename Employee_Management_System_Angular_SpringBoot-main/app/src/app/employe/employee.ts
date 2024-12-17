import { Entreprise } from '../entreprise/entreprise';
export class Employee {
  id!: number;
  firstName!: string;
  lastName!: string;
  emailId!: string;
  phoneNumber!: string;
  nationalId!: string;
  birthDate!: string;
  position!: string;
  entreprise!: Entreprise | { nom: string, id: number };
}

