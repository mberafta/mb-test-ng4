import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { TextComponent, HttpComponent, ChatComponent } from './index';

// Pipes
import { SummaryPipe } from './summary.pipe';

// Services
import { JsonPlaceHolderService } from './services/jsonPlaceHolder.service';
import { AuthorService } from './services/author.service';

// Helpers
import { AppErrorHandler } from './helpers/app-error-handler';
import { Author } from './models';

const routes: Routes = [
  { path: 'jsph/:size/:id', component: HttpComponent },
  { path: 'text', component: TextComponent },
  { path: 'chat', component: ChatComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    HttpComponent,
    ChatComponent,
    SummaryPipe
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    JsonPlaceHolderService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    AuthorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
