import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'smart-book-demo-page',
  templateUrl: './book-demo-page.component.html',
  styleUrls: ['./book-demo-page.component.scss']
})
export class BookDemoPageComponent implements OnInit {
  public enquiryForm: FormGroup;

  public boardFields: any[];
  public mediumFields: any[];
  public classFields: any[];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.classFields = [{ value: '6', option: 'Class 6'}, { value: '7', option: 'Class 7'},
      { value: '9', option: 'Class 8'}, { value: '9', option: 'Class 9'},
      { value: '10', option: 'Class 10'}, { value: '11', option: 'Class 11'},  { value: '12', option: 'Class 12'}];

    this.boardFields = [{ value: 'cbse_board', option: 'CBSE'}, { value: 'cg_board', option: 'CG Board'}];
    this.mediumFields = [{ value: 'english_medium', option: 'English Medium'}, { value: 'hindi_medium', option: 'Hindi Medium'}];
  }

  ngOnInit() {
    this.enquiryForm = this.fb.group({
      nameInputField: new FormControl('', [Validators.required]),
      emailInputField: new FormControl('', [Validators.required, Validators.email]),
      mobileInputField: new FormControl('', [Validators.required, Validators.pattern('[987]{1}[0-9]{9}')]),
      schoolInputField: new FormControl(''),
      classSelectField: new FormControl('select_class'),
      boardRadioField: new FormControl(''),
      mediumRadioField: new FormControl(''),
      message: new FormControl('')
    });
  }

  saveForm(form): void {

    const body = new URLSearchParams();
    for (let key in form) {
      if (form.hasOwnProperty(key)) {
        const value = form[key];
        key = key.replace('InputField', '');
        key = key.replace('RadioField', '');
        key = key.replace('SelectField', '');
        body.set(key, value);
      }
    }

    if (form.message === '') {
      this.http.post('https://getsimpleform.com/messages?form_api_token=01da805abe24c1ebb67e766ab9aade94', body.toString(), {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }
      ).subscribe((data) => {
        console.log('success', data);
      }, (err) => {
        if (err.status === 200) {
          console.log('success');
        }
      });
    }

  }
}
