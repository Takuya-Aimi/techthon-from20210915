exports.postSingle = async (req, res) => {
  const { id, name, price, on_sale, count } = req.body;
  const database = require('../../database');

  const db = new database();
  await db.init();

  const common = require('../../common')
  const resultGetStockById = await common.getStockById(db, id);

  if (resultGetStockById) {
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
        const sqlInsertStock = `INSERT INTO stock VALUES (${id}, '${name}', ${price}, ${on_sale}, ${count});`;
        await db.query(sqlInsertStock);
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
