import express from 'express';

const app = express();

app.get('/users',(request, response)=>{
    response.json([
        'Gabriel',
        'Diego',
        'Matheus'
    ])
});

app.listen(3333);