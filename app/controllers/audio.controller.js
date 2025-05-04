import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

const Audio = mongoose.model('audios');
const __dirname = dirname(fileURLToPath(import.meta.url));

export async function stream(req, res) {
    try {
        const audio = await Audio.findById(req.params.id);
        if (!audio) return res.status(404).send('Audio not found');

        const audioPath = path.join(__dirname, '../../public/audio', audio.src);
        if (!fs.existsSync(audioPath)) return res.status(404).send('File not found');

        const audioSize = fs.statSync(audioPath).size;
        const range = req.headers.range;

        if (!range) {
            // No range header, send the whole file
            res.writeHead(200, {
                'Content-Length': audioSize,
                'Content-Type': 'audio/mpeg',
            });
            fs.createReadStream(audioPath).pipe(res);
        } else {
            const CHUNK_SIZE = 1 * 1024 * 1024; // 1MB
            const start = Number(range.replace(/\D/g, ""));
            const end = Math.min(start + CHUNK_SIZE - 1, audioSize - 1);

            const contentLength = end - start + 1;
            const headers = {
                'Content-Range': `bytes ${start}-${end}/${audioSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': contentLength,
                'Content-Type': 'audio/mpeg',
            };

            res.writeHead(206, headers);
            fs.createReadStream(audioPath, { start, end }).pipe(res);
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}
