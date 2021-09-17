exports.getStockById = async (db, id) => {
  const resultsGetStockById = await db.query(`SELECT id, name, price, on_sale, count FROM stock WHERE id = ${id};`);
  if (resultsGetStockById.length === 0) {
    return undefined;
  } else {
    return resultsGetStockById[0];
  }
}
