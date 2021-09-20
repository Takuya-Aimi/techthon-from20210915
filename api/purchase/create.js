exports.postCreate = async (req, res) => {
  const { id, bought_at, staff_name, items } = req.body;
  const database = require('../database');

  const db = new database();
  await db.init();

  const itemsStockIdList = items.map(item => item.stock_id);
  const sqlGetStockInId = `SELECT id FROM stock WHERE id IN (${itemsStockIdList.join(',')});`;
  const resultsGetStockInId = await db.query(sqlGetStockInId);

  const sqlGetPurchaseById = `SELECT id FROM purchase WHERE id = ${id}`;
  const resultsGetPurchaseById = await db.query(sqlGetPurchaseById);

  if (resultsGetStockInId.length !== itemsStockIdList.length || resultsGetPurchaseById.length > 0) {
    res.json(
      {
        status_code: 400,
        method: 'POST'
      }
    );
    db.release();
  } else {
    try {
      await db.txBegin();
      try {
        const sqlInsertPurchase = `INSERT INTO purchase VALUES (${id}, '${bought_at}', '${staff_name}');`;
        await db.query(sqlInsertPurchase);

        const sqlGetPurchaseItemMaxId = 'SELECT MAX(id) AS max_id FROM purchase_item;';
        const resultGetPurchaseItemMaxId = await db.query(sqlGetPurchaseItemMaxId);
        const curId = resultGetPurchaseItemMaxId.length > 0 ? resultGetPurchaseItemMaxId[0].max_id + 1 : 1;


        await Promise.all(
          [
            ...items.map(async (item, idx) => {
              const sqlInsertPurchaseItem = `INSERT INTO purchase_item SELECT ${curId + idx}, ${id}, ${item.stock_id}, price, ${item.bought_count} FROM stock WHERE id = ${item.stock_id};`;
              return await db.query(sqlInsertPurchaseItem);
            }),
            ...items.map(async (item) => {
              const sqlUpdateStock = `UPDATE stock SET count = count - ${item.bought_count} WHERE id = ${item.stock_id};`;
              return await db.query(sqlUpdateStock);
            })
          ]
        );
        await db.txCommit();
      }
      catch (err) {
        await db.txRollback();
        throw err;
      }
    }
    catch (err) {
      console.log(err);
      res.sendStatus(500);
      throw err;
    }
    finally {
      db.release();
    }

    res.json(
      {
        status_code: 201,
        method: 'POST'
      }
    );
  }
}
