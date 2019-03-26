// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Initialize Firebase
  firebaseConfig: {
    apiKey: "AIzaSyBPPwX8hFcGEkdFm2b2iOdweYSeGA8-psQ",
    authDomain: "appointexv3.firebaseapp.com",
    databaseURL: "https://appointexv3.firebaseio.com",
    projectId: "appointexv3",
    storageBucket: "appointexv3.appspot.com",
    messagingSenderId: "237240925329"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
