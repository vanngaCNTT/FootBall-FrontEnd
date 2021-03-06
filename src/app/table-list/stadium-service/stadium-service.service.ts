import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable' 
import {  RouteInfo } from '../domain';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

@Injectable()
export class StadiumService {

  private baseUrl:string = "http://localhost:8080/api/stadium";
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers:this.headers});


  constructor(private _http:Http) { }

  getStadium(){

    return this._http.get(this.baseUrl + '', this.options).map((response:Response)=>response.json())
    .catch(this.errorHandler);
  }

  errorHandler(error:Response){
    
    return Observable.throw(error||"SERVER ERROR")
  }
  

}
