import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { catchError, map } from 'rxjs/operators';
import { Pagination, Role } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RolesService extends BaseService {
  private _sharedHeader = new HttpHeaders();
  constructor(private http: HttpClient) {
    super();
    this._sharedHeader = this._sharedHeader.set('Content-type', 'application/json');
  }

  add(entity: Role) {
    return this.http
      .post(`${environment.apiUrl}/api/roles`, JSON.stringify(entity), { headers: this._sharedHeader })
      .pipe(catchError(this.handlerError));
  }

  update(id: string, entity: Role) {
    return this.http
      .put(`${environment.apiUrl}/api/roles/${id}`, JSON.stringify(entity), { headers: this._sharedHeader })
      .pipe(catchError(this.handlerError));
  }

  getDetail(id) {
    return this.http
      .get<Role>(`${environment.apiUrl}/api/roles/${id}`, { headers: this._sharedHeader })
      .pipe(catchError(this.handlerError));
  }

  getAllPaging(filter, pageIndex, pageSize) {
    return this.http
      .get<Pagination<Role>>(
        `${environment.apiUrl}/api/roles/filter?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${filter}`,
        { headers: this._sharedHeader }
      )
      .pipe(
        map((response: Pagination<Role>) => {
          return response;
        }),
        catchError(this.handlerError)
      );
  }

  delete(id) {
    return this.http
      .delete(environment.apiUrl + '/api/roles/' + id, { headers: this._sharedHeader })
      .pipe(catchError(this.handlerError));
  }
}
