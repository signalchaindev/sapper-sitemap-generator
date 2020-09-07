# Signal Chain App

## Quick Start

`npm run generate:dev`

## Sample ENV template

```js
// sample .env.js
const devKeys = {
  FRONTEND_URL: 'http://localhost:3000',
  GQL_SERVER_ENDPOINT_BASE: 'http://localhost:3000',
  GQL_SERVER_PATH: '__playground',
  DATABASE_URI: 'mongodb://127.0.0.1:27017/signalchain_db',
  MAIL_HOST: 'smtp.mailtrap.io',
  MAIL_PORT: 2525,
  MAIL_USER: 'c970cdd41984cf',
  MAIL_PASSWORD: 'ea493f78a88a24',
}

const prodKeys = {
  FRONTEND_URL: 'https://signalchain.io',
  WWW_FRONTEND_URL: 'https://www.signalchain.io',
  GQL_SERVER_ENDPOINT_BASE: 'https://signalchain.io',
  GQL_SERVER_PATH: '__graphql',
  DATABASE_URI: '',
  MAIL_HOST: '',
  MAIL_PORT: 2525,
  MAIL_USER: '',
  MAIL_PASSWORD: '',
  MG_PUB_KEY: '',
  MG_API_KEY: '',
  MG_DOMAIN: '',
}

const sharedKeys = {
  APP_SECRET: '',
  COOKIE_MAX_AGE: 2592000000, // 1 month from now
  RESET_TOKEN_EXPIRY: 3600000, // 1 hour from now
  SUBSCRIBE_TOKEN_EXPIRY: 1209600000, // 2 weeks from now
  PUBLIC_EMAIL: 'signalchain.tutorials@gmail.com',
}

export default {
  development: { ...devKeys, ...sharedKeys },
  production: { ...prodKeys, ...sharedKeys },
}
```

## Pinned Deps

"googleapis": "12.4.0",
