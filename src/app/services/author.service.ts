import { Injectable } from '@angular/core';
import { Author } from '../models/index';

const AUTHORS: Author[] = [
    new Author("Mickaël", "Vikoroff", "MikaViko", "mickael.vikoroff@lol.fr", 29, "male", "MONTPELLIER"),
    new Author("Alistark", "Vikoroff", "AliViko", "alistark.vikoroff@lol.fr", 75, "male", "MOSCOU"),
    new Author("Natasja", "Vikoroff", "NataViko", "natasja.vikoroff@lol.fr", 25, "female", "PRAGUE"),
    new Author("Liandra", "Vikoroff", "LiaViko", "liandra.vikoroff@lol.fr", 29, "female", "MONTPELLIER"),
];

@Injectable()
export class AuthorService {

    get(email: string) {
        AUTHORS.map((a) => { console.log(a.email); });
        console.log('Email parameter -> ', email);
        if (email) {
            let result = AUTHORS.filter((author) => {
                return author.email == email;
            });
            return result;
        }
        else {
            return AUTHORS;
        }
    }

}