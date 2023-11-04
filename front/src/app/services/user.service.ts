import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


const baseUrl = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');        
    return this.http.post<any>(`http://localhost:8080/api/register`, user);
}

  getAllUsers() : Observable<User[]>{
    return this.http.get<User[]>(baseUrl); 
  }

  getUserById(userId: number) {
    return this.http.get(`${baseUrl}/${userId}`);
  }

  getLoggedUser(): Observable<User>{
    return this.http.get<User>(`http://localhost:8080/api/loggedUser`); 
  }



}
