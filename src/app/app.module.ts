import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ServicesComponent } from './components/services/services.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { NotificationComponent } from './components/notification/notification.component';
import { FormContainerComponent } from './components/form-container/form-container.component';
import { BookDemoPageComponent, ApplyJobPageComponent, HomePageComponent } from './pages';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpClientModule } from '@angular/common/http';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};

export const config: CloudinaryConfiguration = {
  cloud_name: 'dren4jgbp',
  upload_preset: 'pna3p8zf'
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ServicesComponent,
    TestimonialsComponent,
    NotificationComponent,
    FormContainerComponent,
    BookDemoPageComponent,
    ApplyJobPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CloudinaryModule.forRoot(cloudinary,  config),
    FileUploadModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
