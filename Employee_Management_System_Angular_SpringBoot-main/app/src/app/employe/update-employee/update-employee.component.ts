import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  id!: number;
  employee: Employee = new Employee();

  // Indicateurs d'erreur
  firstNameInvalid: boolean = false;
  lastNameInvalid: boolean = false;
  emailInvalid: boolean = false;
  phoneInvalid: boolean = false;
  nationalIdInvalid: boolean = false;
  positionInvalid: boolean = false;
  birthDateInvalid: boolean = false;

  // Messages d'erreur
  firstNameErrorMessage: string = '';
  lastNameErrorMessage: string = '';
  emailErrorMessage: string = '';
  phoneErrorMessage: string = '';
  nationalIdErrorMessage: string = '';
  positionErrorMessage: string = '';
  birthDateErrorMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(
      (data) => {
        this.employee = data;
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    // Réinitialisation des erreurs
    this.resetErrors();

    // Validation des champs
    if (!this.employee.firstName || this.employee.firstName.trim() === '') {
      this.firstNameInvalid = true;
      this.firstNameErrorMessage = 'Le prénom doit être rempli.';
    } else if (/^\d+$/.test(this.employee.firstName)) {
      this.firstNameInvalid = true;
      this.firstNameErrorMessage = 'Le prénom ne peut pas être un nombre.';
    }

    if (!this.employee.lastName || this.employee.lastName.trim() === '') {
      this.lastNameInvalid = true;
      this.lastNameErrorMessage = 'Le nom doit être rempli.';
    } else if (/^\d+$/.test(this.employee.lastName)) {
      this.lastNameInvalid = true;
      this.lastNameErrorMessage = 'Le nom ne peut pas être un nombre.';
    }

    if (!this.employee.emailId || this.employee.emailId.trim() === '') {
      this.emailInvalid = true;
      this.emailErrorMessage = 'L\'adresse e-mail doit être remplie.';
    } else if (!/\S+@\S+\.\S+/.test(this.employee.emailId)) {
      this.emailInvalid = true;
      this.emailErrorMessage = 'L\'adresse e-mail doit être valide.';
    }

    if (!this.employee.phoneNumber || this.employee.phoneNumber.trim() === '') {
      this.phoneInvalid = true;
      this.phoneErrorMessage = 'Le numéro de téléphone doit être rempli.';
    } else if (!/^\d+$/.test(this.employee.phoneNumber)) {
      this.phoneInvalid = true;
      this.phoneErrorMessage = 'Le numéro de téléphone doit contenir uniquement des chiffres.';
    }

    if (!this.employee.nationalId || this.employee.nationalId.trim() === '') {
      this.nationalIdInvalid = true;
      this.nationalIdErrorMessage = 'L\'identifiant national doit être rempli.';
    } else if (!/^\w+$/.test(this.employee.nationalId)) {
      this.nationalIdInvalid = true;
      this.nationalIdErrorMessage = 'L\'identifiant national doit être valide.';
    }

    if (!this.employee.birthDate || this.employee.birthDate.trim() === '') {
      this.birthDateInvalid = true;
      this.birthDateErrorMessage = 'La date de naissance doit être remplie.';
    }

    if (!this.employee.position || this.employee.position.trim() === '') {
      this.positionInvalid = true;
      this.positionErrorMessage = 'Le poste doit être rempli.';
    }

    // Vérification si des erreurs sont présentes
    if (
      this.firstNameInvalid ||
      this.lastNameInvalid ||
      this.emailInvalid ||
      this.phoneInvalid ||
      this.nationalIdInvalid ||
      this.birthDateInvalid ||
      this.positionInvalid
    ) {
      console.log('Formulaire invalide');
      return;
    }

    // Soumission si tout est valide
    this.updateEmployee();
  }

  private resetErrors() {
    this.firstNameInvalid = false;
    this.lastNameInvalid = false;
    this.emailInvalid = false;
    this.phoneInvalid = false;
    this.nationalIdInvalid = false;
    this.positionInvalid = false;
    this.birthDateInvalid = false;

    this.firstNameErrorMessage = '';
    this.lastNameErrorMessage = '';
    this.emailErrorMessage = '';
    this.phoneErrorMessage = '';
    this.nationalIdErrorMessage = '';
    this.positionErrorMessage = '';
    this.birthDateErrorMessage = '';
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(
      (data) => {
        this.goToEmployeeList();
      },
      (error) => console.log(error)
    );
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
}
