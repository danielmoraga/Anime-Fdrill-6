import * as fs from 'node:fs/promises';
import * as path from 'node:path';

export const loadFile = async(folder, filename) => {

    const filePath = path.join(folder, filename)
    try {
        let file = await fs.open(filePath);

        const data = await fs.readFile(file, {encoding: 'utf8'});

        await file.close();

        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    } 

}
export const saveFile = async(folder, filename, data) => {

    const filePath = path.join(folder, filename)
    try {
        //const file = await fs.open(filePath, 'r+');

        await fs.writeFile(filePath, JSON.stringify(data), { encoding: 'utf8'});

        //await file.close();
    } catch (error) {
        console.error(error);
        
    }
}


