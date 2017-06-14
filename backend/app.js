import path from 'path'
import express from 'express'
import favicon from 'serve-favicon'
import routes from './routes'
import config from './config'
import loggers from './loggers'
const compression = require('compression');

const LEGIT_APP_SECRET = config.get('LEGIT_APP_SECRET')

const log = loggers.get('app')

const app = express()

app.use(require('prerender-node').set('prerenderToken', '8nDnghm1e4A1BNId6JdQ'));
app.use(compression()) // Enable gzip

const oneYear = 1 * 365 * 24 * 60 * 60 * 1000
app.use("/", express.static(path.resolve(__dirname, '../public'), { maxAge: oneYear }))

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(
    'Express server listening at http://%s:%s',
    server.address().address,
    server.address().port
  )
})
