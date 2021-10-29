import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { catchError, map } from 'rxjs/operators';
import { Function, Pagination, User } from '../models';
import { environment } from '../../../environments/environment';
import { UtilitiesService } from '.';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseService {
  private _sharedHeader = new HttpHeaders();
  constructor(private http: HttpClient, private utilitiesService: UtilitiesService) {
    super();
    this._sharedHeader = this._sharedHeader.set('Content-type', 'application/json');
  }

  add(entity: User) {
    return this.http
      .post(`${environment.apiUrl}/api/users`, JSON.stringify(entity), { headers: this._sharedHeader })
      .pipe(catchError(this.handleError));
  }

  update(id: string, entity: User) {
    return this.http
      .put(`${environment.apiUrl}/api/users/${id}`, JSON.stringify(entity), { headers: this._sharedHeader })
      .pipe(catchError(this.handleError));
  }

  getDetail(id) {
    return this.http
      .get<User>(`${environment.apiUrl}/api/users/${id}`, { headers: this._sharedHeader })
      .pipe(catchError(this.handleError));
  }

  getAllPaging(filter, pageIndex, pageSize) {
    return this.http
      .get<Pagination<User>>(
        `${environment.apiUrl}/api/users/filter?filter=${filter}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
        { headers: this._sharedHeader }
      )
      .pipe(
        map((res: Pagination<User>) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  delete(id) {
    return this.http
      .delete(`${environment.apiUrl}/api/users/${id}`, { headers: this._sharedHeader })
      .pipe(catchError(this.handleError));
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
      catchError(this.handleError)
    );
  }

  getUserRoles(userId: string) {
    return this.http
      .get<string[]>(`${environment.apiUrl}/api/users/${userId}/roles`, { headers: this._sharedHeader })
      .pipe(catchError(this.handleError));
  }

  assignRolesToUser(userId: string, assignRolesToUser: any) {
    return this.http
      .post(`${environment.apiUrl}/api/users/${userId}/roles`, JSON.stringify(assignRolesToUser), {
        headers: this._sharedHeader
      })
      .pipe(catchError(this.handleError));
  }

  removeRolesFromUser(userId: string, assignRolesToUser: any) {
    var query = '';
    assignRolesToUser.forEach((element: any) => {
      query = query + `RoleNames=${element}&`;
    });
    return this.http
      .delete(`${environment.apiUrl}/api/users/${userId}/roles?${query}`, {
        headers: this._sharedHeader
      })
      .pipe(catchError(this.handleError));
  }
}
