exports.getDetail = async (req, res) => {
  const { id } = req.params;
  const database = require('../database');

  const db = new database();
  await db.init();

  const sqlGetPurchaseById = `SELECT id, bought_at, staff_name FROM purchase WHERE id = ${id};`;
  const resultsGetPurchaseById = await db.query(sqlGetPurchaseById);

  if (resultsGetPurchaseById.length > 0) {
    const sqlGetPurchaseItemByPurchaseId = `SELECT purchase_item.stock_id, stock.name, purchase_item.price, purchase_item.bought_count FROM purchase_item INNER JOIN stock ON purchase_item.stock_id = stock.id WHERE purchase_item.purchase_id = ${id} ORDER BY purchase_item.stock_id;`;
    resultsGetPurchaseById[0].items = await db.query(sqlGetPurchaseItemByPurchaseId);

    const moment = require('moment');
    resultsGetPurchaseById[0].bought_at = moment(resultsGetPurchaseById[0].bought_at).format('YYYY-MM-DDTHH:mm:ss');

    res.json(
      {
        status_code: 200,
        method: 'GET',
        purchase: resultsGetPurchaseById[0]
      }
    );
  } else {
    res.json(
      {
        status_code: 404,
        method: 'GET'
      }
    );
  }
  db.release();
}
