import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
public currentuser:string="";
public userRoleId:string="0";
  constructor() { 
    
  }
}
