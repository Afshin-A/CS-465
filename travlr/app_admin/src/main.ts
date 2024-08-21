import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// "bootstrapping" refers to the process of loading and initializing the root component of the application, 
// This tells Angular which component should be loaded first when the application starts.
// instantiates the AppComponent component
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
