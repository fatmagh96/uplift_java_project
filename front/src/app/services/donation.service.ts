import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Donation } from '../models/donation.model';

const baseUrl = 'http://localhost:8080/api/';
@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(private http: HttpClient) { }

  makeDonation(amount:any): Observable<any> {
    return this.http.post<Donation>("http://localhost:8080/api/donation/2", amount, {withCredentials: true} )
  }
}
