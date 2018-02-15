import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'smart-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  public notices: string[];
  constructor() {
    this.notices = [];
  }

  ngOnInit() {
    this.notices.push('<span>Mega Talent Scholarship exam on 15th April 2018. Call now to book your slot</span>');
    this.notices.push('<span>New batches are starting from 1st May 2018 </span>');
    this.notices.push('<span>Faculty recruitment process is ongoing now, visit link to apply</span>');


  }

}
