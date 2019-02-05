const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
