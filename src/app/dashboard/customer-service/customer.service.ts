import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable' 

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

@Injectable()
export class CustomerService {

  private baseUrl:string = "http://localhost:8080/api/customer";
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers:this.headers});


  constructor(private _http:Http) { }

  getCustomerPaid(){

    return this._http.get(this.baseUrl + '', this.options).map((response:Response)=>response.json())
    .catch(this.errorHandler);
  }

  getSumPrice(){
    return this._http.get(this.baseUrl + '/sum', this.options).map((response:Response)=>response.json())
    .catch(this.errorHandler);
  }

  getCount(){
    return this._http.get('http://localhost:8080/api/order/count', this.options).map((response:Response)=>response.json())
    .catch(this.errorHandler);
  }

  errorHandler(error:Response){
    
    return Observable.throw(error||"SERVER ERROR")
  }
}
