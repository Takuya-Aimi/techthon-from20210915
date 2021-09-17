exports.postSingle = (req, res) => {
  const { id, name, price, on_sale, count } = req.body;
  const database = require('../../database');

  const db = new database();
  await db.init();

  const common = require('../../common')
  const resultGetStockById = await common.getStockById(db, id);

  if (resultGetStockById.length === 0) {
    res.json(
      {
        status_code: 400,
        method: 'POST'
      }
    );
    return;
  }

  try {
    await db.txBegin();
    try {
      const insertStock = `INSERT INTO stock VALUES (${id}, '${name}', ${price}, ${on_sale}, ${count});`;
      await db.query(insertStock);
      await db.txCommit();


    }
    catch (err) {
      await db.txRollback();
      throw err;
    }
    finally {
      db.release();
    }
  } catch (err) {
    console.log(err);
    throw err;
  }

  res.json(
    {
      status_code: 201,
      method: 'POST'
    }
  );
}
