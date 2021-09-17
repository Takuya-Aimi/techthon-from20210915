exports.getDetail = async (req, res) => {
  const paramId = req.params.id;
  const database = require('../database');

  const db = new database();
  await db.init();

  const common = require('../common');
  const resultsGetStockById = await common.getStockById(db, paramId);

  if (resultsGetStockById.length > 0) {
    const { id, name, price, on_sale, count } = resultsGetStockById[0];
    res.json(
      {
        status_code: 200,
        method: 'GET',
        item: {
          id,
          name,
          price,
          on_sale,
          count
        }
      }
    );
  } else {
    res.json(
      {
        status_code: 404,
        method: 'GET'
      }
    )
  }
  db.release();
}
