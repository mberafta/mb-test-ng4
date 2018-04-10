import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isActive: boolean = false;
  email: string = "Hello";
  myNumber: number = 2.5874;
  longText: string = "lorem ipsum dot color est in vovo moritori salutae lol lol lol lol lol lol lol lol lol lol lol lo lol lo lolol ol olololololololololololololololololo";
  textFromParent: string = "Text from parent";
  eventObj: any;
  param = {
      size:5,
      id:1 
  };


  changeActiveProperty(): void {
    this.isActive = !this.isActive;
  }

  onKeyUp(): void {
    console.log(this.email);
  }

  onGetChildEvent(eventObj: any): void {
    this.eventObj = eventObj;
  }
}
