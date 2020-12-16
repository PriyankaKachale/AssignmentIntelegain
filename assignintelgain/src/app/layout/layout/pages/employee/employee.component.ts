import { Component, OnInit } from '@angular/core';
import {Employee} from '../../../../../modules/employee';
import { ToastrService } from 'ngx-toastr';
import { LayoutComponent } from '../../layout.component';
import { ServiceService,Options } from 'src/app/service.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public currentLoginId;
  public firstName;
  public role;
  public addbtn = false;
  public employee: Employee = new Employee();
  public employeeList: Employee[];
  constructor(private layout : LayoutComponent, private http: ServiceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getCurrentIds();
    this.getEmployees();
  }

  getCurrentIds() {
    this.currentLoginId = sessionStorage.getItem('firstName');
    this.role = sessionStorage.getItem('role');
  }
  addEmployee(emp) { 
    this.employee.added_by = this.currentLoginId;
    const options = new Options();
    if(this.addbtn){
    this.updateEmployee(emp);
    }
    else{
      console.log(this.employee);
    this.http.post('employee', this.employee, options).subscribe(res => {
      if (res.success == true) {
        emp.reset();
        emp.submitted = false;
        this.toastr.success('Employee Added Successfully...', 'Employee');
        this.getEmployees();
      }else if (res.message == 'duplicate employeeId') {
        this.toastr.error('Employee Id Already Exist', 'Employee');
      } else {
        this.toastr.error('Error While Creation', 'Employee');
      }
    });
   }
   }

   getEmployees() {
    const options = new Options();
    this.http.get('employee', options).subscribe(res => {
      console.log(res);
      this.employeeList = res.data;
    });
  }

  employeeId:any;
  deleteEmployee(id) {
   let employeeId=id;
   const options = new Options();
   this.http.delete('employee/' + employeeId, options).subscribe(res => {
       this.toastr.success('Employee Deleted Successfully...', 'Employee');
       this.getEmployees();
   });
  }

   updateEmployee(emp) {
    const options = new Options();
    this.http.put('employee', this.employee, options).subscribe(res => {
         const empupdataData: any = res;
         if (empupdataData.message == 'email already exist') {
           this.toastr.error('Email Id Already Exist', 'Employee');
         } else {
            if (empupdataData.message == 'userId Duplicate') {
              this.toastr.error('Employee Id Already Exist', 'Employee');
            } else if (empupdataData.message == 'employee update successfully') {
              this.toastr.success('Employee Updated Successfully...', 'Employee');
              this.addbtn = false;
              this.employee.id = null;
              emp.reset();
              emp.submitted = false;
            }
         }

    });

  }

  getEmployeeById(employeeId) {
      const options = new Options();
      this.http.get('employee/' + employeeId, options).subscribe(res => {
        this.addbtn = true;
        this.employee = res.data;
      });
  }
 
}
