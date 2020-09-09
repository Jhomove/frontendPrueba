import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UserModel } from '../../models/User.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: UserModel[];
  constructor(
    private usersSrv: UsersService,
    private router: Router
  ) {
    this.usersSrv.getUsers().subscribe(resp => {
      if (resp.success) {
        this.users = resp.data;
        if ( !this.users.length) {
          Swal.fire({
            icon: 'info',
            text: 'No existen registros actualmente.'
          });
          return false;
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: resp.data
        });
      }
    });
  }

  ngOnInit(): void {
  }

  deleteUser(id: number, index: number) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Una vez eliminado el usuario, no se podrá recuperar sus datos!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersSrv.deleteUser(id).subscribe(resp => {
          if (resp.success) {
            Swal.fire(
              'Eliminado!',
              'El usuario ha sido eliminado correctamente',
              'success'
            );
            this.users.splice(index, 1);
          }
        });
      }
    });
  }

}
