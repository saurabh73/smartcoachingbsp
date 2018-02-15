import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'smart-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isNavbarCollapsed: boolean;
  constructor() {
    this.isNavbarCollapsed = true;
  }
  ngOnInit() {
  }

}
