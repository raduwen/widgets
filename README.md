raduwen-obs-widgets
===================

配信用Widget for オレ

## Instllation

### Firebase
Create your project and configuration environments.
https://console.firebase.google.com/

#### Solucation
- Authentication
- Realtime Database

```
yarn install
cp .env.local.example .env.local
```

```
vim .env.local
# configuration firebase
FIREBASE_KEY=XXXXXXXXXXXXXXXX
FIREBASE_DOMAIN=XXXXXXXXXXXXXXXX
FIREBASE_DATABASE=XXXXXXXXXXXXXXXX
FIREBASE_PROJECT_ID=XXXXXXXXXXXXXXXX
FIREBASE_STORAGE_BUCKET=XXXXXXXXXXXXXXXX
FIREBASE_SENDER_ID=XXXXXXXXXXXXXXXX
FIREBASE_APP_ID=XXXXXXXXXXXXXXXX
```

## Run
### web
```
yarn dev
```

### firebase emulator
```
yarn firebase:emulator:start
```
