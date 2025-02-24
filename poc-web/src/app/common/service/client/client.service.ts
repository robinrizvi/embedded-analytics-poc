import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from './client';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable()
export class ClientService {

  private clientsUrl: string;

  constructor(private http: HttpClient) { 
    this.clientsUrl = 'http://localhost:8080/clients?size=99999';
  }

  public findAll(): Observable<Client[]> {
    return this.http.get<any>(this.clientsUrl).pipe(map(response => response._embedded.clients));
  }
}