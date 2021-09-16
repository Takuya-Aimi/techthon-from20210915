exports.getCheck = (req, res) => {
  res.json({
    status_code: 200,
    method: 'GET'
  });
}
exports.postCheck = (req, res) => {
  res.json({
    status_code: 200,
    method: 'POST'
  });
}
