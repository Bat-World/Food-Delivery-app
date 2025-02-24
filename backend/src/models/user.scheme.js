import mongoose from 'mongoose';
const { Schema , model} = mongoose;

const userSchema = new Schema({
  title: String, 
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});

export const userModel = model('Blog', userSchema);