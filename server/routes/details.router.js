const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.get('/', (req, res) => {
    pool.query(
      `SELECT orders.*, line_item.quantity, menu_item.name, menu_item.price, line_item.notes
      FROM orders
      JOIN line_item ON orders.order_id = line_item.order_id
      JOIN menu_item ON line_item.menu_item_id = menu_item.menu_item_id;`

    ).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error GET /api/menu', error)
        res.sendStatus(500);
    });
  })


module.exports = router;