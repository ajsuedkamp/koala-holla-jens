const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool.js')

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
koalaRouter.get('/', (req, res) => {
    console.log('in GET /koalas');
    //Specify which query to run
    //queryText = SELECT in SQL
    const queryText = 'SELECT * FROM "koala_table";'
    pool.query(queryText).then((result) => {
        console.log('SELECT FROM SUCCESS', result);
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /koals', error);
        res.sendStatus(500);
    });
})



// GET
// koalaRouter.get('/', (req, res) => {
//     res.send(koalas);
// })

// POST

koalaRouter.post('/', (req, res) => {
    const koala = req.body;
    const queryText = `INSERT INTO "koala_table"("name", "age", "gender", "ready", "notes")
    VALUES ($1, $2, $3, $4, $5);`

    pool.query(queryText, [koala.name, koala.age, koala.gender, koala.ready, koala.notes])
        .then((results) => {
            console.log(results);
            res.send(results);
        }).catch((error) => {
            console.log('Error in POST /koalas', error);
            res.sendStatus(500);
        });

});

koalaRouter.delete('/:id', (req, res) => {
    const koalaId = req.params.id;
    console.log('DELETE /koalas', koalaId);
    const queryText = 'DELETE FROM "koala_table" WHERE "id" = $1;';
    pool.query(queryText, [koalaId])
    .then((result) => {
        res.sendStatus(200);//successfully deleted something
    }).catch((error) => {
        console.log('ERROR', error);
        res.sendStatus(500);
    })
})




// koalaRouter.post('/', (req, res) => {
//     const koala = req.body;
//     console.log(req.body);
//     koalas.push(koala);
//     res.send(koala);
//     // res.sendStatus(201);
//   })

// PUT


// DELETE

module.exports = koalaRouter;