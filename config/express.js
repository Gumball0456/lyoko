import express from 'express'
import {homeRoute} from '../app/routes/home.route.js'
import {videoRoute} from '../app/routes/video.route.js'
import {audioRoute} from '../app/routes/audio.route.js'

export default () => {
    const app = express()
    app.set('views', 'app/views')
    app.set('view engine', 'ejs')
    app.use(express.static('public'))

    // register routes
    homeRoute(app)
    videoRoute(app)
    audioRoute(app)

    return app
}