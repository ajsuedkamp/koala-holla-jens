const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool.js');


const koalas = [
    {
        name: 'Scotty',
        age: 4,
        gender: 'M',
        ready: 'true',
        notes: 'Born in Guatemala'
    },
    {
        name: 'Jean',
        age: 5,
        gender: 'F',
        ready: 'true',
        notes: 'Allergic to lots of lava'
    },
    {
        name: 'Ororo',
        age: 7,
        gender: 'F',
        ready: 'false',
        notes: 'Loves listening to Paula (Abdul)'
    },
    {
        name: 'Logan',
        age: 15,
        gender: 'M',
        ready: 'false',
        notes: 'Loves the sauna'
    },
    {
        name: 'Charlie',
        age: 9,
        gender: 'M',
        ready: 'true',
        notes: 'Favorite band is Nirvana'
    },
    {
        name: 'Betsy',
        age: 4,
        gender: 'F',
        ready: 'true',
        notes: 'Has a pet iguana'
    }
];

// DB CONNECTION


// GET
koalaRouter.get('/', (req, res) => {
    console.log('in GET /koalas');
    const queryText = 'SELECT * FROM "koala_table";';

    pool.query(queryText).then((result) => {
        console.log('SELECT FROM SUCCESS', result);
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /koalas', error);
        res.sendStatus(500);
    });
})

// POST
koalaRouter.post('/', (req, res) => {
    const koala = req.body;
    const queryText = `INSERT INTO "koala_table"("name", "age", "gender", "ready", "notes")
    VALUES ($1, $2, $3, $4, $5);`;

    pool.query(queryText, [koala.name, koala.age, koala.gender, koala.ready, koala.notes])
        .then((results) => {
            console.log(results);
            res.send(results);
        })
        .catch((error) => {
            console.log('Error in POST /koalas', error);
            res.sendStatus(500);
        });
})

// PUT

koalaRouter.put('/:id', (req, res) => {
    const koalaId = req.params.id;
    console.log(req.body);

    const queryText = `
        UPDATE "koala_table" SET "ready" = 'true'
        WHERE "id" = $1;`;

    pool.query(queryText, [koalaId])
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500)
        });
    
})

// DELETE

koalaRouter.delete('/:id', (req, res) => {
    const koalaId = req.params.id;
    const queryText = `DELETE FROM "koala_table" WHERE "id" = $1`

    pool.query(queryText, [koalaId])
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
        });
})

module.exports = koalaRouter;