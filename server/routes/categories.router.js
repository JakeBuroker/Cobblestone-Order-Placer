
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.get('/:id', (req, res) => {
  const id = req.params.id;
  const query = `
  SELECT menu_item.menu_item_id
  FROM menu_item
  WHERE menu_item.category_id = $1;
  `;
  pool.query(query, [id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    });
});

module.exports = router;