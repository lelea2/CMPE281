'use strict';

var passwordHash = require('password-hash');

module.exports = {
  hashPassword: function(plainText) {
    return passwordHash.generate(plainText);
  },

  verifyPassword: function(plainText, encryptText) {
    return passwordHash.verify(plainText, encryptText);
  }

}
