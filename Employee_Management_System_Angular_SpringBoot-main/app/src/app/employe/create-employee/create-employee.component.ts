import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { EntrepriseService } from '../entreprise.service'; // Import du service Entreprise
import { Router } from '@angular/router';
import { Entreprise } from '../entreprise'; // Import de l'interface Entreprise

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  entreprises: Entreprise[] = []; // Liste des entreprises
  isOtherEntreprise: boolean = false; // Pour l'option "Autre"
  
  // Variables d'erreur
  firstNameInvalid: boolean = false;
  lastNameInvalid: boolean = false;
  emailInvalid: boolean = false;
  phoneInvalid: boolean = false;
  nationalIdInvalid: boolean = false;
  positionInvalid: boolean = false;
  birthDateInvalid: boolean = false;
  entrepriseInvalid: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private entrepriseService: EntrepriseService, // Injection correcte du service
    private router: Router
  ) {}

  ngOnInit(): void {
    // Appel du service pour récupérer les entreprises
    this.entrepriseService.getEntreprises().subscribe(
      (data) => {
        this.entreprises = data; // Stocke les entreprises dans le tableau
      },
      (error) => console.log(error)
    );
  }

  saveEmployee() {
    this.employeeService.createEmployee(this.employee).subscribe(
      (data) => {
        console.log(data);
        this.goToEmployeeList();
      },
      (error) => console.log(error)
    );
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  onSubmit() {
    // Validation du formulaire
    this.resetErrors();

    if (!this.employee.firstName || this.employee.firstName.trim() === '') {
      this.firstNameInvalid = true;
    }

    if (!this.employee.lastName || this.employee.lastName.trim() === '') {
      this.lastNameInvalid = true;
    }

    if (!this.employee.emailId || this.employee.emailId.trim() === '') {
      this.emailInvalid = true;
    }

    if (!this.employee.phoneNumber || this.employee.phoneNumber.trim() === '') {
      this.phoneInvalid = true;
    }

    if (!this.employee.nationalId || this.employee.nationalId.trim() === '') {
      this.nationalIdInvalid = true;
    }

    if (!this.employee.birthDate || this.employee.birthDate.trim() === '') {
      this.birthDateInvalid = true;
    }

    if (!this.employee.position || this.employee.position.trim() === '') {
      this.positionInvalid = true;
    }

    if (!this.employee.entreprise || this.employee.entreprise.trim() === '') {
      this.entrepriseInvalid = true;
    }

    // Vérification si des erreurs sont présentes
    if (
      this.firstNameInvalid ||
      this.lastNameInvalid ||
      this.emailInvalid ||
      this.phoneInvalid ||
      this.nationalIdInvalid ||
      this.birthDateInvalid ||
      this.positionInvalid ||
      this.entrepriseInvalid
    ) {
      return;
    }

    // Soumission si tout est valide
    this.saveEmployee();
  }

  // Lorsque l'utilisateur sélectionne "Autre", afficher un champ de saisie
  onEntrepriseChange() {
    this.isOtherEntreprise = this.employee.entreprise === 'Autre';
  }

  private resetErrors() {
    this.firstNameInvalid = false;
    this.lastNameInvalid = false;
    this.emailInvalid = false;
    this.phoneInvalid = false;
    this.nationalIdInvalid = false;
    this.positionInvalid = false;
    this.birthDateInvalid = false;
    this.entrepriseInvalid = false;
  }
}
