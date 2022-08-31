# Notes application

A free and open-source notes website application made using Firebase.

It's purpouse is to be a simple alternative to the obsidian and notion. 

you may checkout the site here: [notes](https://joaonotfound.ddns.net) (not the latest version)

I still didn't decide its name and either its logo.

**This site is not usable yet.**

# How to run


You must put your firebase's sdk file in src/firebase-settings/ to be able to run this project..

e.g: 

``src/firebase-settings/firebase-settings.ts``
```
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
```


Also you need to put your admin firebase sdk file into backend/admin-firebase-sdk folder 

e.g.: 

```backend/src/admin-firebase-sdk/credentials.ts```
```
export const credentials = {
  projectId: "",
  privateKey: "",
  clientEmail: ""
}
```

and then: 
```
npm run install && npm run start
```