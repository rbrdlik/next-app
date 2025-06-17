import {Schema, model, models} from 'mongoose';

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: { type: Date, default: Date.now },
});

export const Post = models.Post || model("Post", postSchema);