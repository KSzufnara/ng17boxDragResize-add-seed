import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ResizeBoxComponent } from './resize-box/resize-box.component';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
