import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';


const baseUrl = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');        
    return this.http.post<User>(`http://localhost:8080/api/register`, user, {withCredentials: true});
  }

  loginUser(user: User): Observable<User> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');        
    return this.http.post<User>(`http://localhost:8080/api/login`, user, {withCredentials: true});
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${userId}`);
  }

  getLoggedUser(): Observable<User> {
    return this.http.get<User>("http://localhost:8080/api/loggedUser", {withCredentials: true});
  }

  logoutUser(): any {
    return this.http.get<any>("http://localhost:8080/api/logout", {withCredentials: true});
  }

  updateUser(user: User): Observable<User> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');        
    return this.http.put<User>(`${baseUrl}/${user.id}`, user, {withCredentials: true});
  }

  changePassword(user: User): Observable<User> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');     
    console.log("change password user : ",user);
       
    return this.http.put<User>(`${baseUrl}/changePassword`, user, {withCredentials: true});
  }

  // followCharity(charityId: : void{

  // }

}
