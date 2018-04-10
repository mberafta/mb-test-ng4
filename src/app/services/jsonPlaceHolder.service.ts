import { Injectable } from '@angular/core';
import { Http, Request, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class JsonPlaceHolderService{

    private url:string = "https://jsonplaceholder.typicode.com/posts";

    constructor(private http:Http){

    }

    /**
     * Obtention des posts de jsonPlaceHolder api
     * @param id {Number}
     */
    get(id?:number): Observable<Response>{
        let reqOpts = new RequestOptions({
            method:"GET",
            url:id ? this.url + '/${id}' : this.url
        });

        let req = new Request(reqOpts);
        return this.http.request(req);
    }
}