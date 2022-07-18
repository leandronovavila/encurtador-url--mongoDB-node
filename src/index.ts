import express from 'express';
import { URLController } from './controller/URLController';
import { MongoConnection } from './database/MongoConnection';

const api = express()
api.use(express.json())

const database = new MongoConnection()
database.connect()
/*
//Testar se esta conectado a porta especifícada
api.get('/test', (req: Request, res: Response) => {
    res.json({ success:true })

})
*/
const urlController = new URLController()
api.post('/shorten', urlController.shorten)
api.get('/:hash', urlController.redirect)

api.listen(5000, () => console.log("Express Listening!"))