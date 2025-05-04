import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
    title: String,
    thumbnail: String,
    src: String
});

const Video = mongoose.model('videos', VideoSchema)