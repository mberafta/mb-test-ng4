import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { TextComponent, HttpComponent } from './index';

// Pipes
import { SummaryPipe } from './summary.pipe';

// Services
import { JsonPlaceHolderService } from './services/jsonPlaceHolder.service';

// Helpers
import { AppErrorHandler } from './helpers/app-error-handler';

const routes:Routes = [
  { path: 'jsph/:size/:id', component: HttpComponent },
  { path: 'text', component: TextComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    HttpComponent,
    SummaryPipe
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    JsonPlaceHolderService,
    { provide:ErrorHandler, useClass:AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
