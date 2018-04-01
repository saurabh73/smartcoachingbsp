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
    this.notices.push('<span>Talent Hunt Exam on 28th April 2018.</span>');
    this.notices.push('<span>Registration starts for Talent Hunt Exam starts from 11th April 2018</span>');
    this.notices.push('<span>Discount up-to 30% for scholarship winners. Special additional discount for all exam participants.</span>');
    this.notices.push('<span>New batches are starting from 15th May 2018.</span>');
    this.notices.push('<span>Faculty recruitment process is ongoing now (Freshers can also apply).</span>');
    this.notices.push('<span>Job openings for support staff.</span>');

  }

}
