import { Ingredient } from './ingredient';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class GroceryService {
  private url = '/list';
  constructor (private http: Http) {}

  private handleError(error: Response | any): any {
    console.error('Error: ' + error);
  }
  
  addIngredients(ingredients: string[]): Observable<Ingredient[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let bodyText = JSON.stringify(ingredients);

    return this.http.post(this.url, { bodyText }, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getIngredients(): Observable<Ingredient[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.url, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData (res: Response) {
    let body = res.json();
    return body || {};
  }
}
