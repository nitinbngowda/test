import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  public expanded = false;

  constructor() { }

  toggleSideNav(): void {
    this.expanded = !this.expanded;
  }

}
