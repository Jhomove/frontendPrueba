import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private usersSrv: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', [
        Validators.required, Validators.minLength(5)
      ]],
      last_name: ['', [
        Validators.required, Validators.minLength(5)
      ]],
      email: ['', [
        Validators.required, Validators.email
      ]],
      phone: ['', [
        Validators.required
      ]],
      address: ['', [
        Validators.required
      ]]
    });
  }

  public register() {
    if ( !this.formGroup.invalid ){
      const user = this.formGroup.value;
      this.usersSrv.createUser(user).subscribe(resp => {
        if ( resp.success ) {
          Swal.fire({
            icon: 'success',
            title: 'Felicidades',
            text: 'Usuario creado correctamente'
          });
          this.router.navigate(['/usuarios']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Opps..',
            text: resp.data
          });
        }
      }, err => {
        let textError = '';
        for (const key in err.error.errors) {
          textError += `\n ${err.error.errors[key][0]}`;
        }
        Swal.fire({
          icon: 'error',
          title: 'Opps..',
          text: textError
        });
      });
    }
  }

  public getError(controlName: string): boolean {
    let error = '';
    const control = this.formGroup.get(controlName);
    if (control.touched && control.errors != null) {
      error = JSON.stringify(control.errors);
      return true;
    }
    return false;
  }

}
