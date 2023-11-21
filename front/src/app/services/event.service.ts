import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventDto } from '../models/EventDto.model';
import { Event } from '../models/Event.model';


const baseUrl = 'http://localhost:8080/api/events';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  constructor(private http: HttpClient){}

  createEvent(event : EventDto): Observable<Event>{
    return this.http.post<any>(baseUrl, event ,{withCredentials: true})
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(baseUrl);
  }

  getEventById(eventId: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}/${eventId}`);
  }

  participateInEvent(eventId: string | null): any {
    return this.http.post<any>(`${baseUrl}/participate/${eventId}`, {}, {withCredentials: true})
  }

  quitEvent(eventId: string | null): any {
    return this.http.post<any>(`${baseUrl}/quit/${eventId}`, {}, {withCredentials: true})
  }
}