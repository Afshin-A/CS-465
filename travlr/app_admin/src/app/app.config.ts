// contains configuration settings for your application, such as environment variables, API endpoints, or other application-wide settings

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

// importing routes of the applicatin pages
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    // setting the routes
    provideRouter(routes)
  ]
};
