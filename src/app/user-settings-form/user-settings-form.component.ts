import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: UserSettings = {
    name: "",
    emailOffers: true,
    interfaceStyle: 'dark',
    subscriptionType: 'Annual',
    notes: 'some notes here...',
    singleValue: 'On',
    startDate: new Date(2023,6,24),
    startTime: new Date(),
    ratingPoint: 0
  }

  userSettings: UserSettings = { ...this.originalUserSettings }
  postError = false;
  postErrorMessage = "";
  subscriptionTypes!: Observable<string[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
  }

  onHttpError(error:any){
    console.log("error: ", error);
    this.postError = true;
    this.postErrorMessage = error.error.errorMessage; // as per our resp structure

  }

  onSubmit(form: NgForm){
    console.log('in onSubmit: ', form.valid);

    if(form.valid){
      this.dataService.postUserSettingsForm(this.userSettings)
      .subscribe({
        next: result => {
          this.postError = false;
          console.log("Success: ", result);
        },
        error: err =>  this.onHttpError(err)
      });
    }
    else{
      this.postError = true;
      this.postErrorMessage = "Please fix above errors";
    }
  }

  onBlur(field: NgModel){
    console.log('in onBlur: ', field.valid);
  }

}
