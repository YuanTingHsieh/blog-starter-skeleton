import mongoose from 'mongoose';

const options = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};

const articleSchema = mongoose.Schema({
  id: String,
  content: String,
  title: String,
  tags: {type: [String], default: []}
  // add more
}, options);

export const Article = mongoose.model('Article', articleSchema);
