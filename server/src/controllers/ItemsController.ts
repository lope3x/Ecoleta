import knex from '../database/connection';
import { Request, Response } from 'express';
import { andress,route } from '../utils/constants';
import { Item } from '../utils/interfaces';

class ItemsController {
    async index (request: Request , response: Response) {
        const items : Item [] = await knex('items').select('*');
    
        const serializedItems  = items.map(item =>{
            return {
                id: item.id,
                title: item.title,
                image_url: `http://${andress}:${route}/uploads/${item.image}`,
            };
        })
        return response.json(serializedItems)
    }
}

export default ItemsController;