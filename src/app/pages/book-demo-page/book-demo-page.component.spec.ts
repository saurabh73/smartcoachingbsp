import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDemoPageComponent } from './book-demo-page.component';

describe('BookDemoPageComponent', () => {
  let component: BookDemoPageComponent;
  let fixture: ComponentFixture<BookDemoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDemoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDemoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
