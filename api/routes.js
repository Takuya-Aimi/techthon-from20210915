module.exports = app => {
  const check = require('./check');
  app.route('/check')
    .get(check.getCheck)
    .post(check.postCheck);

  const init = require('./init');
  app.route('/init')
    .put(init.putInit);

  const stockCreateSingle = require('./stock/create/single');
  app.route('/stock/create/single')
    .post(stockCreateSingle.postSingle);

  const stockDetail = require('./stock/detail');
  app.route('/stock/detail/:id')
    .get(stockDetail.getDetail);

  const stockList = require('./stock/list');
  app.route('/stock/list')
    .get(stockList.getList);

  const stockUpdate = require('./stock/update');
  app.route('/stock/update/:id')
    .put(stockUpdate.putUpdate);

  const stockDelete = require('./stock/delete');
  app.route('/stock/delete/:id')
    .delete(stockDelete.deleteDelete);
}
