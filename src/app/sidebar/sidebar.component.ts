import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isCollapsed?: boolean;
  constructor() { }

  ngOnInit(): void {
    this.isCollapsed = true;
  }

}
