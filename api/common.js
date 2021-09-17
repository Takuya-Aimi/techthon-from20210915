exports.getStockById = async (db, id) => {
  return await db.query(`SELECT id, name, price, on_sale, count FROM stock WHERE id = ${id};`);
}
