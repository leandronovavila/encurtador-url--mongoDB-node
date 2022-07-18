import { config } from '../config/Constants';
import { Request, Response } from 'express';
import shortId from 'shortid';
import { URLModel } from 'database/model/URL';

export class URLController{
    public async shorten(req: Request, response: Response): Promise<void>{
        //ver se a url ja não existe
        const { originURL } = req.body
        const url = await URLModel.findOne({ originURL })
        if (url){
            response.json(url)
            return
        }
        // criar o hash para a url
        
        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`

        // salvar a url no banco
        const newURL = await URLModel.create({ hash, shortURL, originURL})
        // retornar a url salva
        response.json(newURL)
    }
    
    public async redirect(req: Request, response: Response): Promise<void> {
		const { hash } = req.params
		const url = await URLModel.findOne({ hash })

		if (url) {
			response.redirect(url.originURL)
			return
		}

		response.status(400).json({ error: 'URL not found' })
	}
}
