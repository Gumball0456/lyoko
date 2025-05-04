import mongoose from 'mongoose'

const audioSchema = new mongoose.Schema({
    title: String,
    src: String
})

const Audio = mongoose.model('audios', audioSchema)