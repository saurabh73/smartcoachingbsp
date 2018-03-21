import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'smart-apply-job-page',
  templateUrl: './apply-job-page.component.html',
  styleUrls: ['./apply-job-page.component.scss']
})
export class ApplyJobPageComponent implements OnInit {
  public jobForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      nameInputField: new FormControl('', [Validators.required]),
      emailInputField: new FormControl('', [Validators.required, Validators.email]),
      mobileInputField: new FormControl('', [Validators.required, Validators.pattern('[987]{1}[0-9]{9}')]),
      roleInputField: new FormControl('', [Validators.required]),
      experienceInputField: new FormControl(''),

    });
  }

  ngOnInit() {
  }

}
