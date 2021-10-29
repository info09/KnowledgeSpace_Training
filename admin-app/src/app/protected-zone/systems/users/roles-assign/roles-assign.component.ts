import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RolesService, UsersService } from '../../../../shared/services';

@Component({
  selector: 'app-roles-assign',
  templateUrl: './roles-assign.component.html',
  styleUrls: ['./roles-assign.component.scss']
})
export class RolesAssignComponent implements OnInit {
  //Default
  private chosenEvent: EventEmitter<any> = new EventEmitter();
  public blockPanel = false;

  //UserRole
  public items: any[];
  public selectedItems = [];
  public title: string;
  public userId: string;
  public existingRoles: any[];
  constructor(public bsModalRef: BsModalRef, private usersService: UsersService, private rolesService: RolesService) {}

  ngOnInit(): void {
    this.loadAllRoles();
  }

  loadAllRoles() {
    this.blockPanel = true;
    this.rolesService.getAll().subscribe((res: any) => {
      res.forEach(function (element) {
        element.Selected = false;
      });

      const existingRoles = this.existingRoles;
      const newRoles = res.filter(function (item) {
        return existingRoles.indexOf(item.id) === -1;
      });

      this.items = newRoles;
      if (this.selectedItems.length === 0 && this.items.length > 0) {
        this.selectedItems.push(this.items[0]);
      }
      setTimeout(() => {
        this.blockPanel = false;
      }, 1000);
    });
  }

  chooseRoles() {
    this.blockPanel = true;
    const selectedNames = [];
    this.selectedItems.forEach((element) => {
      selectedNames.push(element.name);
    });
    const assignRolesToUser = {
      roleNames: selectedNames
    };
    this.usersService.assignRolesToUser(this.userId, assignRolesToUser).subscribe(() => {
      this.chosenEvent.emit(this.selectedItems);
      setTimeout(() => {
        this.blockPanel = false;
      }, 1000);
    });
  }
}
