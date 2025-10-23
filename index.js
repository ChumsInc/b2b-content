import express from 'express';
const app = express();
app.set('trust proxy', 'loopback, linklocal, uniquelocal');
app.use(express.static('content'));
app.use((req, res, next) => {
    console.log(req.path);
    next();
});
app.use('/', express.static(process.cwd(), { index: 'index.html' }));
app.listen(8080);
