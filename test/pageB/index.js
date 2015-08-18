var swig = require('swig');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var debug = require('debug')('swig:loader');

var root = path.join(__dirname, '../');

swig.setDefaults({
  loader: {
    resolve: function(to, from) {

      debug('form: %s, to: %s', from, to);

      if (!from) {
        return to;
      }

      // 以 / 打头,从root开始
      if (_.startsWith(to, '/')) {
        return path.join(root, to);
      }

      return path.join(path.dirname(from), to);
    },

    load: function(id, cb) {
      debug('loading: %s', id);

      if (cb) {
        fs.readFile(id, 'utf8', cb);
      } else {
        return fs.readFileSync(id, 'utf8');
      }

    }
  }
})

var result = swig.renderFile(__dirname + '/views/index.swig');
console.log(result);