const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes/index.js')

const app = express()

app.use(express.json())
app.use(cors({ origin: ["http://127.0.0.1:5173", "https://pf-front-the-revenge-h8gg.vercel.app"] }))
app.use(morgan('dev'))
app.use(routes)

/* app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send({message});
}); */

module.exports = app