import request from 'supertest';
import * as http from 'node:http';
import { router } from '../router/router.js';


describe('Pruebas al servidor', () => {
    
    let server;

    beforeEach((done)=>{
        server = http.createServer(router);
        server.listen(()=>{
            done();
        });
    });

    afterEach((done)=>{
        server.close(done);
    })

    test('Deberia obtener todos los animes', async () => {
        const res = await request(server).get('/api/anime');

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/application\/json/);
        expect(Array.isArray(Object.values(res.body))).toBe(true);
    });

    test('Deberia obtener un anime por ID', async () => {
        const res = await request(server).get('/api/anime/1');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('nombre', 'Akira');
    });

    test('Deberia crear un anime', async() => {
        
        const newAnime = {
            nombre: 'One Piece',
            genero: 'Shonen',
            año: '1999',
            autor: 'Eiichiro Oda'
        };

        const res = await request(server)
            .post('/api/anime')
            .send(newAnime)
            .set('Content-Type', 'application/json');
        
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Anime creado!');

    });

    test('Deberia devolver 404 si el ID no existes', async() => {
        const res = await request(server).get('/api/anime/999');

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Anime no encontrado');
    });

    test('Deberia modificar el ultimo anime', async() => {


        const updateAnime = {
            nombre: 'One Piece',
            genero: 'Shonen',
            año: '2000',
            autor: 'Eiichiro Oda'
        };

        const res = await request(server)
        .put('/api/anime/6')
        .send(updateAnime)
        .set('Content-Type', 'application/json');

        expect(res.status).toBe(200);
        expect(res.body.anime).toHaveProperty('año', '2000');
    });

    test('Deberia eliminar el ultimo anime ', async () => {
        const res = await request(server)
        .delete('/api/anime/6');

        expect(res.status).toBe(200);
    });

});