import {Component, Input, EventEmitter, Output, ViewChild, OnInit, ChangeDetectorRef} from '@angular/core';
import {CompleterService, CompleterData} from 'ng2-completer';
import {NgForm, FormControl} from "@angular/forms";
import {BaseComponent} from "../base.component";

@Component({
  selector: 'msp-province',
  templateUrl: './province.component.html'
})

export class MspProvinceComponent extends BaseComponent implements OnInit {

  lang = require('./i18n');

  @Input() showError: boolean;
  @Input() colSize: string = "col-sm-5";
  @Input() province: string;
  @Input() provinceOnly: boolean;
  @Input() provinceLabel: string = this.lang('./en/index.js').provinceLabel;
  @Output() onChange = new EventEmitter<any>();

  @ViewChild('formRef') form: NgForm;
  @ViewChild('provinceInput') inputField: FormControl;

  updateModel(event:string){
    this.province=event;
    this.onChange.emit(event)    
  }
  handleKeyboard(event:KeyboardEvent){
    const input = event.target as HTMLInputElement;
    if(!input.value){
      this.province = '';
    }
  }
  /**
   * Use to remove BC from the list
   * @type {boolean}
   */
  @Input() exceptBC: boolean = false;

  /**
   * Auto complete
   */
  private dataService: CompleterData;
  private provinceData = this.lang('./en/index.js').provinceData;
  private stateData = this.lang('./en/index.js').stateData;
  private get provinceStateData() {
    return Array().concat(this.provinceData, this.stateData);
  }

  constructor(private completerService: CompleterService,
    private cd: ChangeDetectorRef) {
    super(cd);
  }

  ngOnInit() {
    if (this.provinceOnly === true) {
      this.dataService = this.completerService.local(this.provinceData, 'name', 'name');
    }
    else {
      this.dataService = this.completerService.local(this.provinceStateData, 'name', 'name');
    }
  }
}
