### Meteor Wallet

This project is developed according to instructions in [Meteor 101: Starting with MeteorJS](https://university.meteor.com/)

### 1. Environment: 
Node v14.0.0, Meteor v2.14

### 2. Run: 
```meteor npm start```
or
```./command.sh``` (run with ```bash```)

### 3. Deploy: 
https://demo-app.meteorapp.com/

### 4. Note 

#### 4.1. Email (reset password, passwordless,...):

Configuration ```MAIL_URL``` environment variable: ```smtp://username:password@yourService:587```.

You can use [Ethereal Email](https://ethereal.email/) for demo purpose, for example:
```smtp://ardith.gutmann@ethereal.email:n92gpZYpGFCas9mA8A@smtp.ethereal.email:587```


#### 4.2. Google configuration:
- Access: https://console.cloud.google.com/. 
  - OAuth consent screen
  - Credentials > Create Credentials > OAuth client ID

- Add ```googleClientId```, ```googleSecret``` to ```private/env/dev/settings.json```
- Authorized JavaScript origins: http://localhost:3000
- Authorized redirect URIs: http://localhost:3000/_oauth/google

#### 5. Problem

- User registered with email and password and used it to sign in. Then, he signs in with his Google account (using the same email). The app is creating another user!!!
