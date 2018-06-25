import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Data {

    data: any;
    private url: string = 'assets/data/questions.json';

    constructor(public http: HttpClient) {

    }

    load() {

        // if(this.data){
        //     return Observable.of([]);
        // }
      return this.http.get(this.url);

    }

}
