import { Component, OnDestroy } from '@angular/core';
import { JsonPlaceHolderService } from '../../services/jsonPlaceHolder.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/combineLatest'; // Méthode statique, crée un nouvel observable pour une souscription multiple
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'mb-http',
    templateUrl: './http.component.html'
})

export class HttpComponent implements OnDestroy {

    jsonData: any;
    routeParam = {
        size: null,
        id: null
    };

    queryParam: string;

    constructor(
        private jphs: JsonPlaceHolderService,
        private route: ActivatedRoute
    ) {

        Observable.combineLatest([
            this.route.paramMap,
            this.route.queryParamMap
        ])
            .switchMap(combined => {
                this.routeParam.size = combined[0].get('size');
                this.routeParam.id = combined[0].get('id');
                this.queryParam = combined[1].get('userId');

                return this.jphs.get();
            })
            .subscribe((response: Response) => {
                this.jsonData = response.json()
                    .slice(0, this.routeParam.size)
                    .filter((data) => {
                        return data.id == this.routeParam.id;
                    })
            });
    }

    ngOnDestroy() {

    }

}