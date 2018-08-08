import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Action, Reducer, Store } from './interface/redux/IRedux';

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
    size: 5,
    id: 1
  };

  action1: Action = { type: 'INCREMENT' };
  action2: Action = { type: 'DECREMENT' };
  action3: Action = { type: 'PLUS', payload: 7 };

  constructor() {
    let reducer: Reducer<number> = (state: number, action: Action) => {
      if (action != null) {
        switch (action.type) {
          case 'DECREMENT':
            state--;
            break;
          case 'INCREMENT':
            state++;
            break;
          case 'PLUS':
            state += Number(action.payload);
            break;
          default:
            break;
        }
      }

      return state;
    };

    let store = new Store<number>(reducer, 0);

    let unsubscribe = store.subscribe(() => {
      console.log('subscribed: ', store.getState());
    });

    store.dispatch(this.action1);
    store.dispatch(this.action1);

    unsubscribe();
  }

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
