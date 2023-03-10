// import models
const User = require('./User');
const Journal = require('./Journal');

Journal.hasOne(User);
User.belongsTo(Journal);

module.exports = {
  User,
  Journal,
};