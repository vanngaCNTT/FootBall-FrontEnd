import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable' 
import {  RouteInfo } from '../domain';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

@Injectable()
export class DrinkService {

  private baseUrl:string = "http://localhost:8080/api/drink";
  private headers = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers:this.headers});
  private drink:any;

  constructor(private _http:Http) { }

  getDrink(){

    return this._http.get(this.baseUrl + '', this.options).map((response:Response)=>response.json())
    .catch(this.errorHandler);
  }

  getOneDrink(idDrink:Number){

    return this._http.get(this.baseUrl + '/'+ idDrink , this.options).map((response:Response)=>response.json())
    .catch(this.errorHandler);
  }

  getCount(){
    return this._http.get(this.baseUrl + '/count', this.options).map((response:Response)=>response.json())
    .catch(this.errorHandler);
  }


  deleteDrink(idDrink:Number){
    return this._http.delete(this.baseUrl + '/delete/'+idDrink,this.options).map(this.extractData).catch(this.errorHandler);
  }

  updateDrink(drink:any){
    return this._http.put(this.baseUrl + '/update',drink,this.options).map(this.extractData).catch(this.errorHandler);
  }

  createDrink(drink:any){
    // return this._http.post(this.baseUrl + '/new',JSON.stringify(drink),this.options).map(response:Response).catch(this.errorHandler);
    return this._http.post(this.baseUrl+'/new',JSON.stringify(drink),this.options).map(this.extractData)
    .catch(this.errorHandler);
  }

  
  private extractData(res: Response) {        
    return res.text() ? res.json() : {}; ;
  }
  errorHandler(error:Response){
    
    return Observable.throw(error||"SERVER ERROR")
  }

  setterDrink(drink:any){
    this.drink = drink;
  }

  getterDrink(){
    return this.drink;
  }

}
