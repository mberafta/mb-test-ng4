import { Message } from './models/message';
import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import {
  IAction,
  IReducer,
  Store,
  IListener,
  IAppState,
  IAddMessageAction,
  IDeleteMessageAction,
  MessageActions
} from './interface/redux/IRedux';

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

  constructor() {
    let reducer: IReducer<IAppState> = (action: IAction, state: IAppState) => {
      let result;
      if (action.type == 'ADD_MESSAGE') {
        result = {
          messages: state.messages.concat((<IAddMessageAction>action).message)
        };
      }
      if (action.type == 'DELETE_MESSAGE') {
        let index = (<IDeleteMessageAction>action).index;
        let newState = [
          ...state.messages.slice(0, index),
          ...state.messages.slice(index + 1, state.messages.length)
        ];
        result = { messages: newState };
      }
      return result;
    }

    let store = new Store<IAppState>(reducer, {
      messages: []
    });

    let listener: IListener<IAppState> = {
      name: "Listener 1",
      unsubscribe: () => { store.unsubscribe(listener); },
      notify: (val) => { console.log('Listened value : ', val); }
    };

    store.subscribe(listener);

    let action = MessageActions.addMessage('New message');
    let action2 = MessageActions.deleteMessage(0);

    store.dispatch(action);
    store.dispatch(action2);

    listener.unsubscribe();
    store.dispatch(action);

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

  testRedux() {
    /**
          * TEST DE BASE
          */
    let reducer: IReducer<object> = (action: IAction, state: any) => {
      switch (action.type) {
        case 'ADD':
          if (state.name) {
            state.name = action.payload;
          }
          break;
        default:
          break;
      }
      return state;
    }


    let store = new Store<Object>(reducer, { name: 'Init' });
    let action = { type: "ADD", payload: "New item" };
    store.subscribe({
      name: "Listener 1",
      unsubscribe() {
        store.unsubscribe(this);
      },
      notify(value: any) {
        console.log(value);
      }
    });

    store.dispatch(action);
    store.dispatch(action);
    store.listeners[0].unsubscribe();
    store.dispatch(action);
  }
}
