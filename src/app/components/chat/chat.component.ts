import { Component, OnInit, Pipe, trigger } from '@angular/core';
import { Author, Message, User } from '../../models/index';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthorService } from '../../services/author.service';
import io from "socket.io-client";
import { Observable } from 'rxjs/observable';

@Component({
    selector: 'mb-chat',
    templateUrl: './chat.component.html'
})

export class ChatComponent implements OnInit {

    private socket;
    currentChatWindow: any;
    currentUser: any;

    users: Array<User> = [];
    userForm = new FormGroup({
        email: new FormControl(null, [
            Validators.required,
            Validators.email
        ])
    });

    boxMessageForm = new FormGroup({
        message: new FormControl(null)
    });

    constructor(private authorService: AuthorService) {
        this.socket = io("localhost:4500");
    }

    ngOnInit() {
        this.onNewMessage().subscribe(msg => {

        });

        this.onNewUser().subscribe(usr => {

        });
    }

    connectUser(): void {
        let email = this.userForm.value.email,
            valid = email != null;

        console.log(email);

        if (valid) {
            let author = this.authorService.get(email)[0],
                newUser = new User();

            console.log(author);
            newUser.nickname = author.nickname;
            this.currentUser = newUser;
            this.userForm.reset();

            this.currentChatWindow = {
                owner: newUser,
                messages: []
            }

            this.socket.emit('user', newUser);
        }
    }

    sendMessage() {
        let msg = this.boxMessageForm.value.message;
        this.socket.emit('message', { author: this.currentUser, content: msg });
    }

    onNewMessage() {
        return Observable.create(obs => {
            this.socket.on('node_message', (msg) => {
                console.log(msg);
                this.currentChatWindow.messages.push({
                    author: msg.author.nickname,
                    content: msg.content
                });
            });
        });
    }

    onNewUser() {
        return Observable.create(obs => {
            this.socket.on('node_user', (user) => {
                if (this.users.indexOf(user) == -1)
                    this.users.push(user);
            });
        });
    }

}