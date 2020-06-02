import express from 'express';
import knex from './database/connection';
import { Item } from './interfaces'

const routes = express.Router();

const link : string = 'localhost';

const route : string = '3333'



routes.get('/items',async (request, response)=>{
    const items : Item [] = await knex('items').select('*');

    const serializedItems  = items.map(item =>{
        return {
            title: item.title,
            image_url: `http://${link}:${route}/uploads/${item.image}`,
        };
    })
    return response.json(serializedItems)
});

export default routes;