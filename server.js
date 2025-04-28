import express from './config/express.js'

const app = express();
const port = 8080

app.listen(port, () => {
    console.log(`Lyoko server running on port ${port}`);
})