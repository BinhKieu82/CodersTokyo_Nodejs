module.exports.postCreate = function(req, res, next) {
  var errors = [];

  if(!req.body.name) {
    errors.push('Name is required!');
  }
  if(!req.body.version) {
    errors.push('Version is required!');
  }
  if(!req.body.quality) {
    errors.push('Quality is required!');
  }

  if(errors.length) {
    res.render('products/create', {
      errors: errors,
      values: req.body
    });
    return;
  }

  next();
};