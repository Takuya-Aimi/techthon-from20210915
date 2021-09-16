module.exports = app => {
  const check = require('./check');
  app.route('/check')
    .get(check.getCheck)
    .post(check.postCheck);
}
