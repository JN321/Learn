const less = require("less");

module.exports = function loader(source) {
  const callback = this.async();
  less.render(source, { sourceMap: {} }, function (err, res) {
    let { css, map } = res;
    callback(null, css, map);
  });
};
