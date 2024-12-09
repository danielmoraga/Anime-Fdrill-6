import { saveFile, loadFile } from "../utils/data.js";

export class AnimeModel {

    static filePath = 'data/';
    static fileName = 'anime.json';

    static async all(){
        const data = await loadFile(this.filePath, this.fileName);
        return data;
    }

    static async getById(id){
        const data = await loadFile(this.filePath, this.fileName);
        if(!Object.keys(data).includes(id)){
            throw Error(`El anime id ${id} no existe!`);
        }
        return data[id];
    }

    static async getByName(name){
        const data = await loadFile(this.filePath, this.fileName);

        const result = Object.values(data).find(anime => anime.nombre.toLowerCase() === name.toLowerCase());

        if(!result){
            throw Error(`El anime con el nombre "${name}" no existe!`);
        }

        return result;
    }

    static async create(anime){
        const data = await loadFile(this.filePath, this.fileName);
        
        const maxId = Math.max(...Object.keys(data).map(id => parseInt(id)));

        data[maxId+1] = anime;
        
        await saveFile(this.filePath, this.fileName, data);

        return anime;
    }

    static async update (id, anime){
        const data = await loadFile(this.filePath, this.fileName);

        if(!Object.keys(data).includes(id)){
            throw Error(`El anime id ${id} no existe!`);
        }

        data[id] = anime;

        await saveFile(this.filePath, this.fileName, data);
    }

    static async delete(id){
        const data = await loadFile(this.filePath, this.fileName);

        if(!Object.keys(data).includes(id)){
            throw Error(`El anime id ${id} no existe!`);
        }
        
        const newData = Object.fromEntries(
            Object.entries(data).filter(([key]) => key !== id)
        );

        await saveFile(this.filePath, this.fileName, newData);

    }
}