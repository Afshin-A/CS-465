import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  constructor() { }
  ngOnInit(): void {
  }
}