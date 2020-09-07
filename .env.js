const devKeys = {
  NODE_ENV: 'development',
  FRONTEND_URL: 'http://localhost:3000',
}

const prodKeys = {
  NODE_ENV: 'production',
}

const sharedKeys = {
  PORT: 3000,
}

export default {
  development: { ...devKeys, ...sharedKeys },
  production: { ...prodKeys, ...sharedKeys },
}