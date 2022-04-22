import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class FunctionService extends BaseService {
    constructor(private http: HttpClient) {
        super();
    }
}
