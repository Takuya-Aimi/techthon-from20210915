exports.getList = async (req, res) => {
  const { min_count, max_count, on_sale } = req.query;

  const database = require('../database');

  const db = new database();
  await db.init();

  const queryGetStock = `SELECT id, name, price, on_sale, count FROM stock WHERE 1 = 1 ${min_count ? `AND count >= ${min_count}` : ''} ${max_count ? `AND count <= ${max_count}` : ''} ${on_sale ? `AND on_sale = ${on_sale}` : ''} ORDER BY id;`;
  const resultsGetStock = await db.query(queryGetStock);
  res.json(
    {
      status_code: 200,
      method: 'GET',
      items: resultsGetStock
    }
  );
  db.release();
}
