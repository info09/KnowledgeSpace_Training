import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { catchError, map } from 'rxjs/operators';
import { Function, User } from '../models';
import { environment } from '../../../environments/environment';
import { UtilitiesService } from '.';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseService {
  constructor(private http: HttpClient, private utilitiesService: UtilitiesService) {
    super();
  }
  getAll() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<User[]>(`${environment.apiUrl}/api/users`, httpOptions).pipe(catchError(this.handlerError));
  }

  getMenuByUser(userId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<User[]>(`${environment.apiUrl}/api/users/${userId}/menu`, httpOptions).pipe(
      map((response) => {
        var functions = this.utilitiesService.UnflatteringForLeftMenu(response);
        return functions;
      }),
      catchError(this.handlerError)
    );
  }
}
