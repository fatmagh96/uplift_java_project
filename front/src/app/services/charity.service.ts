import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Charity } from '../models/charity.model';


const baseUrl = 'http://localhost:8080/api/charities';

@Injectable({
  providedIn: 'root'
})
export class CharityService {

  constructor(private http: HttpClient) { }

  createCharity(charity: any): Observable<Charity> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');        
    return this.http.post<any>(`http://localhost:8080/api/charities/new`, charity, {withCredentials: true});
  }

  getAllCharities(): Observable<Charity[]> {
    return this.http.get<Charity[]>(baseUrl);
  }

  getAllCharitiesByCategory(category: any): Observable<Charity[]> {
    return this.http.get<Charity[]>(`${baseUrl}/${category}`);
  }

  getCharityById(charityId: string | null): Observable<Charity> {
    return this.http.get<Charity>(`${baseUrl}/${charityId}`);
  }
}
