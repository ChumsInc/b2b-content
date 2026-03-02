import express, {Request, Response, NextFunction} from 'express';
import path from "node:path";
import helmet from "helmet";

const app = express();
app.set('trust proxy', 'loopback, linklocal, uniquelocal');
app.use(express.static('content'));
app.use((req:Request, res:Response, next:NextFunction) => {
    console.log(req.path);
    next();
})
app.use('/', express.static(process.cwd(), {index: 'index.html'}));
app.get('/content/:filename', (req:Request, res:Response) => {
    res.sendFile(path.join(process.cwd(), 'content', req.params.filename as string));
})
app.listen(8080);
