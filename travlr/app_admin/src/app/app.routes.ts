import { Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { LoginComponent } from './login/login.component';

// routes: Routes
// varName: varType
export const routes: Routes = [
    {
        path: 'add-trip',
        component: AddTripComponent,
    },
    {
        path: '',
        component: TripListingComponent,
        pathMatch: 'full'
    },
    {
        path: 'edit-trip',
        component: EditTripComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
