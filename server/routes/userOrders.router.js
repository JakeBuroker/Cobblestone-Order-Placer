const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.get('/', (req, res) => {
    const userId = req.user.id;
    if (req.isAuthenticated())
     {pool
        .query(`SELECT * FROM "orders" WHERE user_id = ${userId};`)
        .then((results) => res.send(results.rows))
        .catch((error) => {
          console.log('Error making SELECT for secrets:', error);
          res.sendStatus(500);
        });
    } else res.sendStatus(403)
    });

module.exports = router