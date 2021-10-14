import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { EmployeeModel } from './employee-dashboard.mode';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employees: any;
  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    });
    this.getAllEmployees();
  }

  addEmployeeClick() {
    this.formValue.reset();
    this.isEditing = false;
  }

  closeModal() {
    const btnCancel = document.getElementById('cancel');
    btnCancel?.click();
    this.formValue.reset();
  }

  createEmployee() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.api.create(this.employeeModelObj).subscribe(
      (rest) => {
        this.closeModal();
        this.getAllEmployees();
        alert('Employee Created');
      },
      (error) => {
        alert('Error to create employee');
      }
    );
  }

  getAllEmployees() {
    this.api.getMany().subscribe((resp) => {
      this.employees = resp;
    });
  }

  deleteEmployee(id: string) {
    this.api.delete(id).subscribe((resp) => {
      this.getAllEmployees();
      alert('Employee Deleted');
    });
  }

  editEmployee(employee: EmployeeModel) {
    this.isEditing = true;
    this.employeeModelObj.id = employee.id;
    this.formValue.controls['firstName'].setValue(employee.firstName);
    this.formValue.controls['lastName'].setValue(employee.lastName);
    this.formValue.controls['email'].setValue(employee.email);
    this.formValue.controls['mobile'].setValue(employee.mobile);
    this.formValue.controls['salary'].setValue(employee.salary);
  }

  updateEmployee() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.api
      .update(this.employeeModelObj.id, this.employeeModelObj)
      .subscribe((resp) => {
        this.closeModal();
        this.getAllEmployees();
        alert('Update success');
      });
  }
}
