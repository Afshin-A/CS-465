import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trips } from '../data/trips';

// importing another component. this makes TripCard the child component, and TripListing the parent component
import { TripCardComponent } from '../trip-card/trip-card.component';
// this a decorator. It marks the TripListingComponent as a decorator. It also provides meta data 
@Component({
  // html tags associated with the class. i.e <app-trip-listing></app-trip-listing>
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  // associated .component.html
  templateUrl: './trip-listing.component.html',
  // associated stylesheet
  styleUrl: './trip-listing.component.css'
})
export class TripListingComponent implements OnInit {
  // exporting trips allows us to access it in html file using {{trips}}
  // variableName: variableType = value
  trips: Array<any> = trips;
  constructor() { }
  // enforced by the interface

  // this method executes only after the component is available
  // if you are using a service, calls to the service should be made in this function because
  // it means the service is instantiated and is ready to use
  ngOnInit(): void {
  }
}