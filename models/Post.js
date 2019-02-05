const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  postTitle: String,
  postBody: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
mongoose.model('Post', PostSchema);

module.exports = mongoose.model('Post');
