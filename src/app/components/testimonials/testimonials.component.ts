import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'smart-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
  providers: [NgbCarouselConfig]
})
export class TestimonialsComponent implements OnInit {

  constructor(config: NgbCarouselConfig) {
    config.interval = 2000;
  }

  ngOnInit() {
  }

}
