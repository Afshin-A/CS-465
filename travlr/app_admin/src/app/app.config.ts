// contains configuration settings for your application, such as environment variables, API endpoints, or other application-wide settings

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
// importing routes of the applicatin pages
import { routes } from './app.routes';

import { authInterceptProvider } from './utils/jwt.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    // setting the routes
    provideRouter(routes),
    // This sets up Angular's HttpClient service, which is used to make HTTP requests to external APIs or servers.
    provideHttpClient(),
    authInterceptProvider
  ]
};
