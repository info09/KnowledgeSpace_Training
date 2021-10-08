import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { MonthlyNewMembersComponent } from './statistics/monthly-new-members/monthly-new-members.component';

@NgModule({
  imports: [CommonModule, LayoutRoutingModule, TranslateModule, NgbDropdownModule],
  declarations: [LayoutComponent, SidebarComponent, HeaderComponent, MonthlyNewMembersComponent]
})
export class ProtectedZoneModule {}
