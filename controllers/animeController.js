import { AnimeModel } from '../models/animeModel.js';


export const animeController = async(req, res, payload, urlParts) => {

    if(req.method == 'GET' && !urlParts[2]){
        try {
            const data = await AnimeModel.all();

            res.writeHead(200, 'OK', { "content-type" : "application/json"});
            res.end(JSON.stringify(data));
        } catch (error) {
            res.writeHead(500, 'Internal Server Error', { "content-type":"application/json"});
            res.end(JSON.stringify({message: error.message}));
        }
    
    
    } else if(req.method == 'GET' && urlParts[2]){
        try {
            const data = await AnimeModel.getById(urlParts[2]);
            res.writeHead(200, 'OK', { 'content-type':'application/json'});
            res.end(JSON.stringify(data));
        } catch (error) {
            res.writeHead(404, 'Not Found', { 'content-type':'application/json'});
            res.end(JSON.stringify({ message: 'Anime no encontrado'}));
        }


    }else if(req.method == 'POST' && !urlParts[2]){

        try {
            const data = JSON.parse(payload);

            const status = await AnimeModel.create(data);

            if(!status){
                throw Error('No se pudo guardar el anime!');
            }
            res.writeHead(201, 'Created', { 'content-type':'application/json'});
            res.end(JSON.stringify({message: 'Anime creado!'}));
        } catch (error) {
            res.writeHead(500, 'Internal Server Error', { 'content-type':'application'});
            res.end(JSON.stringify({ message: 'Error interno al crear el anime'}));
        }

    }else if (req.method == 'PUT' && urlParts[2]){

        try {
            const data = JSON.parse(payload);

            await AnimeModel.update(urlParts[2], data);

            res.writeHead(200, 'OK', { 'content-type':'application/json'});
            return res.end(JSON.stringify({ message: 'Updated', anime: data}));

        } catch (error) {
            res.writeHead(400, 'Bad Request', { 'content-type':'application/json'});
            return res.end(JSON.stringify({ message: error.message}));
            
        }

    }else if(req.method == 'DELETE' && urlParts[2]){

        try {
            await AnimeModel.delete(urlParts[2]);

            res.writeHead(200, 'OK', { "content-type":"application/json"});
            return res.end(JSON.stringify({message : "Anime eliminado con exito!"}));
        } catch (error) {
            res.writeHead(404, 'Not Found', { "content-type": "application/json"});
            return res.end(JSON.stringify({message: "Anime no encontrado!"}));
        }
    }


}