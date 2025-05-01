import express from 'express'
import {homeRoute} from '../app/routes/home.route.js'

export default () => {
    const app = express()
    app.set('views', 'app/views')
    app.set('view engine', 'ejs')
    app.use(express.static('public'))

    // register routes
    homeRoute(app)

    return app
}