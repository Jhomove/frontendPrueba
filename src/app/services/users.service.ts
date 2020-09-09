import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  api = 'http://127.0.0.1:8000/api';
  constructor(
    private http: HttpClient
  ) { }


  getUsers(): Observable<any> {
    return this.http.get(`${this.api}/user`);
  }

  createUser(user: UserModel): Observable<any> {
    return this.http.post(`${this.api}/user`, user);
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.api}/user/${id}`);
  }

  updateUser(user: UserModel, id: number): Observable<any> {
    return this.http.put(`${this.api}/user/${id}`, user);
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete(`${this.api}/user/${id}`);
  }
}
