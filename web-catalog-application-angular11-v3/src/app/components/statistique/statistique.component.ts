import { Component, OnInit } from '@angular/core';
import {EventDriverService} from '../../state/event.driver.service';
import {ActionEvent} from '../../state/product.state';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {

  public  counter: number;
  // composant qui compte le nombre d'opération d'un utilisateur.  Il s'appuye sur le subscriber de "eventDriveServrice"
  constructor(private eventDriverService: EventDriverService ) {
    this.counter = 0 ;
  }

  ngOnInit(): void {

    // effectue un subscribe
    this.eventDriverService.sourceEventSubjectObservable.subscribe(
      (actionEvent: ActionEvent) => {
        // increment count à chaque evenement declenché
        ++this.counter;
        console.log(this.counter);
       }
    );
  }

}
