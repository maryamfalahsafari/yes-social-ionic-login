import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Service {

    constructor(public http: Http, public api: Api) { }

 
    facebook(token):Observable<any>{
        return this.api.get_('https://graph.facebook.com/me?fields=id,name,email&access_token=' + token)
          .map(response =>  response.json());
         // .do(data => console.log('All: ' +  JSON.stringify(data)))
          //.catch(this.handleError);
    }
    getYesIdBySocialId = function(socialType,id){
        return this.api.post('api/getYesIdBySocialId',{ socialType : socialType , id : id })
        //.do(data => alert('All: ' +  JSON.stringify(data)))
        .map(response =>  response.json());
    }
    test(){
        return this.api.post('api/test',{ test : 'maryam' })
        //.do(data => alert('All: ' +  JSON.stringify(data)))
        .map(response =>  response.json());
    }
    login = function(loginData){
        console.log(loginData);
        return this.api.postWithHeader('api/authenticate',
        'grant_type=password&username=' + loginData.username + "&password=" + loginData.password)
        //.do(data => alert('All: ' +  JSON.stringify(data)))
        .map(response =>  response.json());
    }
    decodeToken = function(token){
        return this.api.post('api/decode_token',{ token : token })
        .map(response =>  response.json());
    }
    
 
   

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }



 
}