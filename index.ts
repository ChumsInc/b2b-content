import express, {Request, Response, NextFunction} from 'express';
import path from "node:path";

const app = express();
app.set('trust proxy', 'loopback, linklocal, uniquelocal');
app.use(express.static('content'));
app.use((req:Request, res:Response, next:NextFunction) => {
    console.log(req.path);
    next();
})
app.use('/', express.static(process.cwd(), {index: 'index.html'}));
app.listen(8080);
