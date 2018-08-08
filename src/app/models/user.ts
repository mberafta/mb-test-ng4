import { Message } from './message';

export class User{
    nickname:string;
    messages:Message[];

    constructor(){
        this.messages = [];
    }
}