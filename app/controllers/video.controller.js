import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

const Video = mongoose.model('videos');
const __dirname = dirname(fileURLToPath(import.meta.url));


export async function stream(req, res){
    const video = await Video.findById(req.params.id);
    const videoPath = path.join(__dirname, '../../public/video', video.src);                                                      
    const videoSize = fs.statSync(videoPath).size;                                                                                 
    const range = req.headers.range;

    if (!range) {                                                                                                                  
        res.writeHead(200, {                                                                                                       
            'Content-Length': videoSize,                                                                                           
            'Content-Type': 'video/mp4',                                                                                           
        });                                                                                                                        
        fs.createReadStream(videoPath).pipe(res);                                                                                  
    } else {                                                                                                                       
        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        const contentLength = end - start + 1;
        const headers = {
            'Content-Range': `bytes ${start}-${end}/${videoSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': contentLength,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, headers);
        fs.createReadStream(videoPath, { start, end }).pipe(res);
    }
}