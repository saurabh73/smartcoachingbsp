import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'smart-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
  providers: [NgbCarouselConfig]
})
export class TestimonialsComponent implements OnInit {

  public testimonials: any[];

  constructor(config: NgbCarouselConfig) {
    config.interval = 3000;
    this.testimonials = [];
  }

  ngOnInit() {
    this.testimonials.push({
      content: `Teachers at Smart Coaching Classes are very kind and helpful
      . It has been a great learning experience here.`,
      name: 'Prakash',
      course: 'Class 12, Batch 2017'
    });

    this.testimonials.push({
      content: `The teaching, in my opinion, is the best that anyone can hope for
      . Teachers provide an environment in which students are able to reach their full potential`,
      name: 'Krishna',
      course: 'Class 12, Batch 2017'
    });


    this.testimonials.push({
      content: `Frequent exams helped me feel constantly challenged to push myself to exceed what is expected.`,
      name: 'Abhishek',
      course: 'Class 12, Batch 2017'
    });
  }

}
