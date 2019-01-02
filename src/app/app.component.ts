import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DataService } from './data.service';
import { AgeData } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  birthday: FormGroup;
  gender: FormGroup;
  excercise: FormGroup;
  ageData: AgeData[];
  remainingYears: AgeData;
  percentageLived: number;
  years: any;
  months: number;
  days: number;
  hours: number;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {}

  ngOnInit() {
    this.birthday = this.formBuilder.group({
      birthdayDate: ['', Validators.required],
    });
    this.gender = this.formBuilder.group({
      genderSelect: ['', Validators.required],
    });
    this.excercise = this.formBuilder.group({
      excerciseSelect: ['', Validators.required],
    });
    this.dataService.getData().subscribe(data => (this.ageData = data));
  }

  onSubmit() {
    this.remainingYears = this.ageData.filter(
      data => data.age === Math.ceil(moment().diff(moment(this.birthday.value.birthdayDate), 'years', true)),
    )[0];
    this.percentageLived = (this.remainingYears.age / (this.remainingYears.age + this.remainingYears.yearsLeft)) * 100;
    this.years = moment.duration(this.remainingYears.yearsLeft, 'years');
    this.months = this.years.asMonths();
    this.days = this.years.asDays();
    this.hours = this.years.asHours();
  }
}
