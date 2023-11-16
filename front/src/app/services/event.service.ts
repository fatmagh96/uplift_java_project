import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventDto } from '../models/EventDto.model';


const baseUrl = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  constructor(private http: HttpClient){}

  createEvent(event : EventDto): Observable<Event>{
    return this.http.post<any>(baseUrl+"events", event ,{withCredentials: true})
  }
}