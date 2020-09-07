import path from 'path'
import sirv from 'sirv'
import express from 'express'
import cors from 'cors'
import compression from 'compression'
import * as sapper from '@sapper/server'
import dotenv from 'dotenv'

const envPath = path.join(process.cwd(), '.env')
dotenv.config({ path: envPath })

const dev = process.env.NODE_ENV === 'development'
const port = parseInt(process.env.PORT) || 3000
const frontendUrl = process.env.FRONTEND_URL
const gqlServerEndpoint = process.env.GQL_SERVER_ENDPOINT_BASE
const gqlServerPath = process.env.GQL_SERVER_PATH
const corsOptions = {
  origin: frontendUrl,
  credentials: true,
  methods: 'GET,POST,PUT,PATCH,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200,
}

const app = express()
app.use(cors(corsOptions))

app.use(
  compression({ threshold: 0 }),
  sirv('static', { dev }),
  sapper.middleware(),
)

// Start app
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const startMsg = `
🚀 Web client ready:
Frontend: ${frontendUrl}
Playground: ${gqlServerEndpoint}/${gqlServerPath}\n`

app.listen(port, err => {
  if (err) {
    console.error('🚨  UNABLE TO START: An error occurred on the sapper server')
    console.error(err.stack)
    process.exit(1)
  }
  dev && console.log(startMsg)
})
