import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'smart-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  public fbLink: string;
  private googleLink: string;
  constructor() {
    this.fbLink = 'https://www.facebook.com/smartcoachingbsp/';
    // tslint:disable-next-line:max-line-length
    this.googleLink = 'https://www.google.co.in/maps/place/SMART+COACHING+CLASSES/@22.0566379,82.1840905,16z/data=!4m8!1m2!2m1!1ssmart+coaching+centre+bilaspur!3m4!1s0x0:0x6852fd98c1b0ab06!8m2!3d22.0553098!4d82.1887314';
  }

  ngOnInit() {
  }

  fbRedirect(): void {
    window.open(this.fbLink, '_blank');
  }

  googleRedirect(): void {
    window.open(this.googleLink, '_blank');
  }
}
