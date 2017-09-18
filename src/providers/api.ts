import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string;//= 'http://10.24.9.126:3004';//'http://localhost/YesMapAPI/api'

  constructor(public http: Http) {
    this.http.get('assets/config.json')
    .map((res) => res.json())
    .subscribe(data => {
       // alert(JSON.stringify(data));
        this.url = data["server-url"];
    },error => {alert(JSON.stringify(error)); } );
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for(let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.url + '/' + endpoint, body, options);
  }
  postWithHeader(endpoint: string, body: any){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this.http.post(this.url + '/' + endpoint, body, {
      headers: headers
    });
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }
  get_(endpoint: string) {
    
    console.log(endpoint);
    return this.http.get(endpoint);
  }
}
