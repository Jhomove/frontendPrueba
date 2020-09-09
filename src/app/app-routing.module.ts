import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { DeleteUserComponent } from './pages/delete-user/delete-user.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsersComponent
  },
  {
    path: 'crear-usuario',
    component: CreateUserComponent
  },
  {
    path: 'editar-usuario/:id',
    component: EditUserComponent
  },
  {
    path: '**',
    redirectTo: 'users',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
