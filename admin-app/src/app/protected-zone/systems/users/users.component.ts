import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/index';
import { UsersService } from '../../../shared/services/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users$: Observable<User[]>;
  constructor(private userService: UsersService) {}
  ngOnInit() {
    this.users$ = this.userService.getAll();
  }
}
