
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

router.get('/:id', (req, res) => {
  const categoryId = req.params.id;
  const query = `
  SELECT *
  FROM menu_item
  WHERE menu_item.category_id = $1;
`;
pool.query(query, [categoryId])
  .then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    console.log('Error GET /api/menu', error);
    res.sendStatus(500);
  });
});



module.exports = router;