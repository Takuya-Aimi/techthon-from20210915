exports.deleteDelete = async (req, res) => {
  const { id } = req.params;
  const database = require('../database');

  const db = new database();
  await db.init();

  const common = require('../common')
  const resultGetStockById = await common.getStockById(db, id);

  if (resultGetStockById) {
    try {
      await db.txBegin();
      try {
        const sqlDeleteStockById = `DELETE FROM stock WHERE id = ${id};`;
        await db.query(sqlDeleteStockById);
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
        method: 'DELETE'
      }
    )
  } else {
    res.json(
      {
        status_code: 404,
        method: 'DELETE'
      }
    )
    db.release();
  }
}
