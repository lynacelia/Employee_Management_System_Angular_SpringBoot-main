import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { EntrepriseService } from '../../entreprise/entreprise.service';
import { Employee } from '../employee';
import { Entreprise } from '../../entreprise/entreprise';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  entreprises: Entreprise[] = [];  // Liste des entreprises

  // Ajout de l'option entreprise personnalisée
  entrepriseSelectionnee: string = '';
  entrepriseExistante: boolean = true;

  // Indicateurs d'erreur pour l'employé
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
    private entrepriseService: EntrepriseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupération des entreprises au moment de l'initialisation du composant
    this.entrepriseService.getEntreprises().subscribe(
      (data) => {
        this.entreprises = data;
      },
      (error) => console.log(error)
    );
  }

  saveEmployee() {
    // Si l'option 'Autre' est sélectionnée, on ajoute l'entreprise personnalisée
    if (!this.entrepriseExistante) {
      this.employee.entreprise = { nom: this.entrepriseSelectionnee, id: 0 };
    }
    this.employeeService.createEmployee(this.employee).subscribe(
      (data) => {
        this.goToEmployeeList();
      },
      (error) => console.log(error)
    );
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  onSubmit() {
    // Réinitialisation des erreurs
    this.resetErrors();

    // Validation des champs
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
    if (!this.employee.position || this.employee.position.trim() === '') {
      this.positionInvalid = true;
    }
    if (!this.employee.birthDate) {
      this.birthDateInvalid = true;
    }

    // Validation de l'entreprise
    if (!this.entrepriseExistante && !this.entrepriseSelectionnee.trim()) {
      this.entrepriseInvalid = true;
    }

    // Si des erreurs existent, on arrête la soumission
    if (
      this.firstNameInvalid ||
      this.lastNameInvalid ||
      this.emailInvalid ||
      this.phoneInvalid ||
      this.nationalIdInvalid ||
      this.positionInvalid ||
      this.birthDateInvalid ||
      this.entrepriseInvalid
    ) {
      return;
    }

    // Soumission du formulaire si tout est valide
    this.saveEmployee();
  }

  // Réinitialisation des erreurs
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

  // Changer l'option d'entreprise (soit dans la liste, soit "Autre")
  onEntrepriseChange(event: any) {
    if (event.target.value === 'Autre') {
      this.entrepriseExistante = false;
    } else {
      this.entrepriseExistante = true;
    }
  }
}
