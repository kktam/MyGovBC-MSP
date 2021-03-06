import { Component, Input, Output, ViewChild, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IPerson } from "../../../model/person.interface";
import DataService from '../../../service/msp-data.service';
import {FinancialAssistApplication} from "../../../model/financial-assist-application.model";
import {BaseComponent} from "../../../common/base.component";
import {MspBirthDateComponent} from "../../../common/birthdate/birthdate.component";
import {MspPhnComponent} from "../../../common/phn/phn.component";
import {MspNameComponent} from "../../../common/name/name.component";

@Component({
  selector: 'msp-assistance-personal-details',
  templateUrl: './personal-details.component.html'
})
export class AssistancePersonalDetailComponent extends BaseComponent {
  lang = require('./i18n');
  private finApp:FinancialAssistApplication;

  @Input() person: IPerson;
  @ViewChild('name') name: MspNameComponent;
  @ViewChild('formRef') personalDetailsForm: NgForm;
  @ViewChild('birthdate') birthdate: MspBirthDateComponent;
  @ViewChild('phn') phn: MspPhnComponent;

  @Output() onChange = new EventEmitter<any>();

  constructor(private dataService: DataService,
    private cd: ChangeDetectorRef) {
    super(cd);
    this.finApp = this.dataService.finAssistApp;
    this.person = this.dataService.finAssistApp.applicant;
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.personalDetailsForm.valueChanges
      .subscribe( values => {
        // console.log('Personal details form value changes saved: ', values);
        this.onChange.emit(values);
      });
  }

} 