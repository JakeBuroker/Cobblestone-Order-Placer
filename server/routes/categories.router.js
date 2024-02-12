
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.get('/', (req, res) => {
  pool.query('SELECT * from "categories";').then((result) => {
      res.send(result.rows);
  }).catch((error) => {
      console.log('Error GET /api/menu', error)
      res.sendStatus(500);
  });
})
module.exports = router;