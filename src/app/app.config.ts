import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          'projectId': 'ng-fitness-tracker-e088d',
          'appId': '1:96735579881:web:715f4328fbadeaa7e02a78',
          'databaseURL': 'https://ng-fitness-tracker-e088d-default-rtdb.firebaseio.com',
          'storageBucket': 'ng-fitness-tracker-e088d.appspot.com',
          'apiKey': 'AIzaSyDHuy1nwV9F55chlV0Ln8LBlbFAm56J4u8',
          'authDomain': 'ng-fitness-tracker-e088d.firebaseapp.com',
          'messagingSenderId': '96735579881',
          'measurementId': 'G-V25L6PPXR9'
        }))),
    importProvidersFrom(
      provideAuth(() =>
        getAuth())),
    importProvidersFrom(
      provideFirestore(() =>
        getFirestore())),
    importProvidersFrom(
      provideDatabase(() =>
        getDatabase())),
    importProvidersFrom(
      provideFunctions(() =>
        getFunctions())),
    importProvidersFrom(
      provideStorage(() =>
        getStorage())),
    importProvidersFrom(
      provideRemoteConfig(() =>
        getRemoteConfig()
      ))]
};
