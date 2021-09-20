exports.postMultiple = async (req, res) => {
  const { items } = req.body;
  const database = require('../../database');

  const db = new database();
  await db.init();

  const itemsIdList = items.map(item => item.id);
  const sqlGetStockInId = `SELECT id FROM stock WHERE id IN (${itemsIdList.join(',')});`;
  const resultsGetStockInId = await db.query(sqlGetStockInId);

  if (resultsGetStockInId.length > 0) {
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
        await Promise.all(items.map(async item => {
          const { id, name, price, on_sale, count } = item;
          const sqlInsertStock = `INSERT INTO stock VALUES (${id}, '${name}', ${price}, ${on_sale}, ${count});`;
          return await db.query(sqlInsertStock);
        }));
        await db.txCommit();
      }
      catch (err) {
        await db.txRollback();
        throw err;
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
      throw err;
    } finally {
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
