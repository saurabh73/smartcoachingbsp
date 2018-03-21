import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'smart-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  private mapLink: string;
  constructor() {
    // tslint:disable-next-line:max-line-length
    this.mapLink = 'https://www.google.co.in/maps/place/SMART+COACHING+CLASSES/@22.0566379,82.1840905,16z/data=!4m8!1m2!2m1!1ssmart+coaching+centre+bilaspur!3m4!1s0x0:0x6852fd98c1b0ab06!8m2!3d22.0553098!4d82.1887314';
  }

  ngOnInit() {
  }

  viewOnMap(): void {
    window.open(this.mapLink, '_blank');
  }

}
