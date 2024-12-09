import * as http from 'node:http';
import { router } from './router/router.js';

const port = process.argv[2] || 3000;

export const server = http.createServer(router);

server.listen(port, ()=>{
    console.log(`Servidor abierto en http://localhost:${port}`);
});