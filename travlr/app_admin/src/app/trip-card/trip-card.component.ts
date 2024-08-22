import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trips';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent implements OnInit {
  // this is an input property, meaning the parent component (i.e TripListingComponent) can pass data into it.
  @Input('trip') trip: any;
  constructor(private router: Router) { }
  ngOnInit(): void {
  }

  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripcode', trip.code);
    this.router.navigate(['edit-trip']);
  }
}