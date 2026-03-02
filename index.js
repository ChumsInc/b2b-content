import express from 'express';
import path from "node:path";
const app = express();
app.set('trust proxy', 'loopback, linklocal, uniquelocal');
app.use(express.static('content'));
app.use((req, res, next) => {
    console.log(req.path);
    next();
});
app.use('/', express.static(process.cwd(), { index: 'index.html' }));
app.get('/content/:filename', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'content', req.params.filename));
});
app.listen(8080);
