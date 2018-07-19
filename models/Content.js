const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const ContentSchema = new Schema ({
  assignee: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  assignTo: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  RSSId: {
    type: Schema.Types.ObjectId,
    ref: 'feed'
  },
  URL:{
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  bookmarks: [
    {
      user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  votes: [
    {
      user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  watchers: [
    {
      user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Content = mongoose.model('content', ContentSchema);
