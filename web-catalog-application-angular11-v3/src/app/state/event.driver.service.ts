import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {ActionEvent} from './product.state';

@Injectable({
  providedIn: 'root'
})
export class EventDriverService {
  sourceEventSubject: Subject<ActionEvent> = new Subject<ActionEvent>();   // subject
  sourceEventSubjectObservable = this.sourceEventSubject.asObservable();   //


  constructor() { }

  publishEvent(event: ActionEvent): void {
    this.sourceEventSubject.next(event);  // publication d'un evenement

  }
}
