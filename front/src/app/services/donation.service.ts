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

  makeDonation(amount:any, charityId:any): Observable<any> {
    return this.http.post<Donation>(`http://localhost:8080/api/donation/${charityId}`, amount, {withCredentials: true} )
  }

  getAllDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>("http://localhost:8080/api/donations");
  }

  getDonationtById(donationId: any): Observable<any> {
    return this.http.get<any>(`${"http://localhost:8080/api/donations"}/${donationId}`);
  }

}
