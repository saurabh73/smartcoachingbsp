import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'smart-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  public notices: string[];
  constructor() {
    this.notices = [];
  }

  ngOnInit() {
    this.notices.push(
      '<span>New batches are starting from 15th April 2019.</span>'
    );
    this.notices.push(
      '<span>Faculty recruitment process is ongoing now (Freshers can also apply).</span>'
    );
    this.notices.push('<span>Job openings for support staff.</span>');
  }
}
