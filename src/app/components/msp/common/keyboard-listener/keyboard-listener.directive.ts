import { Directive, ElementRef, AfterContentInit, EventEmitter,
  Renderer, HostListener, HostBinding, Input, Output } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

/**
 * A keyboard event that matches the mspKeyboard input value will 
 * cause the keyboardAction emitter to fire.
 * 
 * When convertToEvent is set, the keyboardAction will not fire, 
 * instead the event that matches the convertToEvent value will fire.
 */
@Directive({
  selector: '[mspKeyboard]'
})
export class KeyboardEventListner implements AfterContentInit{
  @Input() mspKeyboard:String | Array<String>;
  @Input() convertToEvent:string;
  @Output() keyboardAction:EventEmitter<string> = new EventEmitter<string>();

  constructor(private el: ElementRef, 
    private renderer:Renderer){

  }
  // @HostListener('keyup', ['$event']) 
  // onKeyboardEnter(evt:KeyboardEvent){
  //   if(evt.key === this.mspKeyboard){
  //     this.keyboardAction.emit('Enter key pressed');
  //   }
  // }

  ngAfterContentInit(){
    var self = this;
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      .filter( (evt:KeyboardEvent) => {
        // console.log('event key: ' + evt.key)
        // console.log('type of this.mspKeyboard is array: ' + Array.isArray(this.mspKeyboard));
        if(typeof this.mspKeyboard === 'string'){
          return evt.key === this.mspKeyboard || !evt.key;
        }else if(Array.isArray(this.mspKeyboard)){
          return Array.from(this.mspKeyboard).some(
            (item:String) => {
              return evt.key === item || !evt.key;
            }
          )
        }
      }).subscribe( 
        (evt:KeyboardEvent) => {
          if(this.convertToEvent){
            this.fireEvent();
          }else{
            this.keyboardAction.emit('Enter key pressed');
          }
        }
      );
  }

  fireEvent(){
    this.el.nativeElement.click();
    this.el.nativeElement.focus();
  }
}