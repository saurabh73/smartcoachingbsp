import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'smart-success-notification',
  templateUrl: './success-notification.component.html',
  styleUrls: ['./success-notification.component.scss']
})
export class SuccessNotificationComponent implements OnInit {

  @Input()
  public message:string;

  constructor() {
    this.message= '';
   }

  ngOnInit() {
  }

}
