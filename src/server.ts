import { Application } from 'express'
import * as express from "express"
import available from './routes/available.route'
import { log } from 'console'

const app: Application = express()
const port: number = 3000

app.use('/api/available', available)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(port, () => {
    log(`Room Available API listening on port ${port}`)
})