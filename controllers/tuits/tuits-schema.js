import mongoose from 'mongoose';
const schema = mongoose.Schema({
  tuit: String,
  likes: Number,
  liked: Boolean,
  dislikes: Number,
  disliked: Boolean,
  handle: String,
  image: String,
  time: String,
  replies: String,
  retuits: String,
  title: String,
  topic: String,
  username: String
}, {collection: 'tuits'});
export default schema;