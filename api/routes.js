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
}
