exports.putUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, price, on_sale, count } = req.body;
  const database = require('../database');

  const db = new database();
  await db.init();

  const common = require('../common')
  const resultGetStockById = await common.getStockById(db, id);

  if (resultGetStockById) {
    try {
      await db.txBegin();
      try {
        const sqlUpdateStockById = `UPDATE stock SET id = ${id} ${name ? `,name = '${name}'` : ''} ${price ? `,price = ${price}` : ''} ${on_sale ? `,on_sale = ${on_sale}` : ''} ${count ? `,count = ${count}` : ''} WHERE id = ${id};`;
        await db.query(sqlUpdateStockById);
        await db.txCommit();
      } catch (err) {
        await db.txRollback();
        throw err;
      }
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      db.release();
    }
    res.json(
      {
        status_code: 200,
        method: 'PUT'
      }
    )
  } else {
    res.json(
      {
        status_code: 404,
        method: 'PUT'
      }
    )
    db.release();
  }
}
