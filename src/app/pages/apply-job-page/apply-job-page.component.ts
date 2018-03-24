import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'smart-apply-job-page',
  templateUrl: './apply-job-page.component.html',
  styleUrls: ['./apply-job-page.component.scss']
})
export class ApplyJobPageComponent implements OnInit {
  public jobForm: FormGroup;

  public roleFields: any[];
  public expFields: any[];
  public boardFields: any[];
  public mediumFields: any[];
  public timeSlotFields: any[];
  public subjectFields: any[];
  public classFields: any[];

  public isTeacherRole: boolean;
  public resumeFileName: string;
  public resumeFileUrl: string;

  /* Upload File fields */
  public uploadPreset: string;
  public uploader: FileUploader;
  public loaderShow: boolean;
  public uploaderOptions: FileUploaderOptions;

  public notifySuccess: boolean;
  public notifyError: boolean;

  constructor(private fb: FormBuilder, private cloudinary: Cloudinary, private http: HttpClient, private router: Router) {
    this.isTeacherRole = false;
    this.roleFields = [{ value: 'support_staff', option: 'Support Staff' }, { value: 'teacher', option: 'Teacher' }];
    this.expFields = [{ value: '0', option: '0 (fresher)' }, { value: '1', option: '1 year' },
    { value: '2', option: '2 years' }, { value: '3', option: '3 years' }, { value: '4', option: '5 years' },
    { value: '5', option: '5 years' }, { value: '6', option: '6 years' }, { value: '7', option: '7 years' },
    { value: '8', option: '8 years' }, { value: '9', option: '9 years' }, { value: '10+', option: '10+ years' }];

    this.classFields = [{ value: '6', option: 'Class 6' }, { value: '7', option: 'Class 7' },
    { value: '9', option: 'Class 8' }, { value: '9', option: 'Class 9' },
    { value: '10', option: 'Class 10' }, { value: '11', option: 'Class 11' }, { value: '12', option: 'Class 12' }];

    this.boardFields = [{ value: 'cbse_board', option: 'CBSE' }, { value: 'cg_board', option: 'CG Board' }];
    this.mediumFields = [{ value: 'english_medium', option: 'English Medium' }, { value: 'hindi_medium', option: 'Hindi Medium' }];
    this.timeSlotFields = [{ value: 'morning_slot', option: 'Morning Slot' }, { value: 'evening_slot', option: 'Evening Slot' }];
    this.subjectFields = [{ value: 'all_subjects', option: 'All Subjects' }, { value: 'english', option: 'English' },
    { value: 'hindi', option: 'Hindi' }, { value: 'physics', option: 'Physics' }, { value: 'chemistry', option: 'Chemistry' },
    { value: 'biology', option: 'Biology' }, { value: 'science', option: 'Science' }, { value: 'mathematics', option: 'Mathematics' },
    { value: 'accounting', option: 'Accounting' }, { value: 'other', option: 'Other' }];

    this.uploadPreset = this.cloudinary.config().upload_preset;
    this.uploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      autoUpload: true, // Upload files automatically upon addition to upload queue
      isHTML5: true,  // Use xhrTransport in favor of iframeTransport
      removeAfterUpload: true, // Calculate progress independently for each uploaded file
      headers: [{ // XHR request headers
        name: 'X-Requested-With',
        value: 'XMLHttpRequest'
      }]
    };

    this.loaderShow = false;
    this.notifyError = false;
    this.notifySuccess = false;
    this.resumeFileName = 'Select file';
  }

  ngOnInit() {
    this.jobForm = this.fb.group({
      nameInputField: new FormControl('', [Validators.required]),
      emailInputField: new FormControl('', [Validators.required, Validators.email]),
      mobileInputField: new FormControl('', [Validators.required, Validators.pattern('[987]{1}[0-9]{9}')]),
      roleInputField: new FormControl('select_role'),
      experienceInputField: new FormControl('select_exp'),
      boardCheckboxField: this.fb.array([false, false]),
      mediumCheckboxField: this.fb.array([false, false]),
      timeSlotCheckboxField: this.fb.array([false, false]),
      subjectCheckBoxField: this.fb.array([false, false, false, false, false, false, false, false, false, false]),
      classFieldFrom: new FormControl('select_class'),
      classFieldTo: new FormControl('select_class'),
      resumeFileField: new FormControl('', [Validators.required]),
      message: new FormControl('')
    });

    this.subscribeToFormChanges();

    this.uploader = new FileUploader(this.uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', this.uploadPreset);
      form.append('file', fileItem);
      form.append('resource_type', 'raw');
      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      this.resumeFileName = fileItem.file.name;
      return { fileItem, form };
    };

    this.uploader.onAfterAddingFile = (item: any): any => {
      this.loaderShow = true;
    };

    // Update model on completion of uploading a file
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders): any => {
      const res: any = JSON.parse(response);
      this.resumeFileUrl = res.url;
      this.loaderShow = false;
      this.jobForm.controls['resumeFileField'].setErrors(null);
      return { item, response, status, headers };
    };

  }

  saveForm(form): void {
    this.loaderShow = true;
    const formData: any = {
      name: form.nameInputField,
      email: form.emailInputField,
      mobile: form.mobileInputField,
      resumeLink: this.resumeFileUrl,
      boardPreference: this.checkboxArrToString(form.boardCheckboxField, this.boardFields),
      mediumPreference: this.checkboxArrToString(form.mediumCheckboxField, this.mediumFields),
      timeSlotPreference: this.checkboxArrToString(form.timeSlotCheckboxField, this.timeSlotFields),
      subjectPreference: this.checkboxArrToString(form.subjectCheckBoxField, this.subjectFields),
      message: form.message
    };

    if (form.roleInputField !== 'select_role') {
      formData.role = form.roleInputField;
    }
    if (form.experienceInputField !== 'select_exp') {
      formData.experience = form.experienceInputField;
    }
    let classPreference = '';
    if (form.classFieldFrom !== 'select_class') {
      classPreference += form.classFieldFrom;
    }
    if (form.classFieldTo !== 'select_class') {
      classPreference += ' - ' + form.classFieldTo;
    }
    formData.classPreference = classPreference;
    console.log(formData);

    const body = new URLSearchParams();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        body.set(key, formData[key]);
      }
    }

    if (formData.message === '') {
      this.http.post('https://getsimpleform.com/messages?form_api_token=d325e6a285da0c5f10431fbda6cacb34', body.toString(), {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }
      ).subscribe((data) => {
        console.log('success');
        this.loaderShow = false;
        this.notifySuccess = true;
        this.redirectToHome();
      }, (err) => {
        if (err.status === 200) {
          console.log('success');
          this.loaderShow = false;
          this.notifySuccess = true;
          this.redirectToHome();
        } else {
          this.loaderShow = false;
          this.notifyError = false;
          this.redirectToHome();
        }
      });
    }
  }

  subscribeToFormChanges(): void {
    // initialize stream
    const myFormValueChanges$ = this.jobForm.valueChanges;

    // subscribe to the stream
    myFormValueChanges$.subscribe(x => {
      this.isTeacherRole = x.roleInputField === 'teacher';
    });
  }

  checkboxArrToString(arr: boolean[], fieldArr: any[]): string {
    let strValue = '';
    arr.forEach((value, index) => {
      if (value) {
        strValue += fieldArr[index].option + ', ';
      }
    });
    return strValue.substr(0, strValue.length - 2).trim();
  }

  redirectToHome() {
    setTimeout(() => {
      this.notifyError = false;
      this.notifySuccess = false;
      this.loaderShow = false;
      this.router.navigateByUrl('/home');
    }, 5000);
  }

}
