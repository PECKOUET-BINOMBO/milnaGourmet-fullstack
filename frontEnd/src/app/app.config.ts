import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCh_tWwuU-7KSxlm_OaNLrpvzkotY372Ng",
  authDomain: "milna-gourmet.firebaseapp.com",
  projectId: "milna-gourmet",
  storageBucket: "milna-gourmet.appspot.com",
  messagingSenderId: "889342146514",
  appId: "1:889342146514:web:4e2307a18a940ce9ef3a0b",
  measurementId: "G-NE48JD6D3S"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
