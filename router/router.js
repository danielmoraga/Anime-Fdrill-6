import { animeController } from "../controllers/animecontroller.js";

export const router = (req, res) => {

    const url = req.url;
    const urlParts = url.split('/').filter(part => !!part).map(part => part.split('?')[0]);

    let payload = '';

    req.on('data', chunk => {payload += chunk});


    req.on('end', ()=>{
        if(urlParts[0] == 'api' && urlParts[1] == 'anime'){
            animeController(req, res, payload, urlParts);
        }else{
            res.writeHead(404, 'Not Found', { "content-type": 'text/plain'});
            res.end('No encontrado');
        }
    })

}