import { environment } from '../environments/environment';

const config = {
    apiKey: environment.FIREBASE_API_KEY,
    authDomain: environment.FIREBASE_AUTH_DOMAIN,
    databaseURL: environment.FIREBASE_DATABASE_URL,
    projectId: environment.FIREBASE_PROJECT_ID,
    storageBucket: environment.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: environment.FIREBASE_SENDER_ID,
    appId: environment.FIREBASE_APP_ID
  };

export default config;
