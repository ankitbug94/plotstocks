var Stock = require('./models/stock');
module.exports = function (req, res, next) {
  Stock.find({}, function (err, entries) {
    if (err) return next(err);
    var counter = 0,
      final = [];
    if (entries.length == 0) {
      res.json(entries)
    }
    var flag = true;
    entries.forEach(function (el) {
      console.log(el);
      require("./retrieve.js")(el.stockId, function (data, err, statusCode) {
        counter++;
        final.push(data);
        console.log(data);
        if (counter == entries.length && flag) {
          res.json(final);
          flag = false;
        }
      });
    });
  });
}
