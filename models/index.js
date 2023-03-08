// import models
const User = require('./User');
const Journal = require('./Journal');

Journal.belongsTo(User);
User.hasMany(Journal);

module.exports = {
  User,
  Journal,
};