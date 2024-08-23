import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// used for statically putting data in the application
import { trips } from '../data/trips';

// used for pulling data from the database using express API
import { Trip } from '../models/trips';
import { TripDataService } from '../services/trip-data.service';

// importing another component. this makes TripCard the child component, and TripListing the parent component
import { TripCardComponent } from '../trip-card/trip-card.component';

import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

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
  constructor(private tripDataService: TripDataService, private router: Router, private authenticationService: AuthenticationService) {
    console.log('trip-lisiting constructor');
  }

  private getStuff(): void {
    // getTrips returns an 'Observable'
    this.tripDataService.getTrips().subscribe(
      {
        next: (value: any) => {
          let message = '';
          this.trips = value;
          if (value.length > 0) { message = 'There are ' + value.length + ' trips available.'; }
          else { message = 'There are no trips retrieved from the database.'; }
          console.log(message);
        },
        error: (error: any) => {
          console.log('Error ' + error);
        }
      }
    );
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  public isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }


  // enforced by the interface
  // this method executes only after the component is available
  // if you are using a service, calls to the service should be made in this function because
  // it means the service is instantiated and is ready to use
  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}