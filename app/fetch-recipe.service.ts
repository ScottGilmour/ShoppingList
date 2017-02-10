import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class FetchRecipeService {
  private handleError(error: Response | any): any {
    console.error('Error: ' + error);
  }
  public query = '';
  private url = '/recipe';
  private add_url = '/recipe/add';

  constructor (private http: Http) {}

  getRecipe(query: string): Observable<Recipe[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url,  { query }, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  addRecipe(url: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.add_url, { url }, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData (res: Response) {
    let body = res.json();
    return body || {};
  }
}
