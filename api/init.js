exports.putInit = async (req, res) => {
  const database = require('./database');
  const db = new database();

  await db.init();

  try {
    await db.txBegin();

    try {
      await db.query('DELETE FROM stock;');
      await db.query("INSERT INTO stock VALUES (1, 'pen', 100, true, 100);");
      await db.txCommit();
    } catch (err) {
      await db.txRollback();
      throw err;
    }
  }
  catch (err) {
    console.log(err);
    throw err;
  }
  finally {
    db.release();
  }

  res.json({
    status_code: 200,
    method: 'PUT'
  });
}
