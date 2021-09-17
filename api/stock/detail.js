exports.getDetail = async (req, res) => {
  const { id } = req.params;
  const database = require('../database');

  const db = new database();
  await db.init();

  const common = require('../common');
  const resultsGetStockById = await common.getStockById(db, id);

  if (resultsGetStockById) {
    res.json(
      {
        status_code: 200,
        method: 'GET',
        item: resultsGetStockById
      }
    );
  } else {
    res.json(
      {
        status_code: 404,
        method: 'PUT'
      }
    );
    db.release();
  }

}
