import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public formGroup: FormGroup;
  id: number;
  constructor(
    private formBuilder: FormBuilder,
    private usersSrv: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getUser(this.id);
    this.buildForm();
  }

  getUser(id) {
    this.usersSrv.getUser(id).subscribe(resp => {
      console.log('edit-',resp);
      this.formGroup.setValue({
        name: resp.data.name,
        last_name: resp.data.last_name,
        email: resp.data.email,
        phone: resp.data.phone,
        address: resp.data.address,
      });
    });
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      name: [null, [
        Validators.required, Validators.minLength(5)
      ]],
      last_name: [null, [
        Validators.required, Validators.minLength(5)
      ]],
      email: [null, [
        Validators.required, Validators.email
      ]],
      phone: [null, [
        Validators.required
      ]],
      address: [null, [
        Validators.required
      ]]
    });
  }

  /*
    TODO:
    Alertas con response de peticiones
  */
  public update() {
    if ( !this.formGroup.invalid ){
      const user = this.formGroup.value;
      this.usersSrv.updateUser(user, this.id).subscribe(resp => {
        if ( resp.success ) {
          Swal.fire({
            icon: 'success',
            title: 'Felicidades',
            text: 'Usuario actualizado correctamente'
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
