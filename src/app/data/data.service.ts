import { Injectable } from '@angular/core';
import { UserSettings } from './user-settings';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  postUserSettingsForm(userSettings: UserSettings) : Observable<any>{
    //return this.http.post('https://eoqryiuha6ccwlw.m.pipedream.net', userSettings);
    
    return of(userSettings);
  }

  getSubscriptionTypes():Observable<string[]>{

    return of(['Monthly', "Quarterly", "Yearly"]);
    //return this.http.get<string[]>('https://eopm9bq7871lctd.m.pipedream.net');
  }
}
