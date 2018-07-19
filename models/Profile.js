const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  bookmarks: [
    {
      content_id: {
        type: Schema.Types.ObjectId,
        ref: 'content'
      },
      content_title: {
        type: String,
        required: true
      },
      content_desc: {
        type: String,
        required: true
      },
      content_URL: {
        type: String,
        required: true
      }
    }
  ],
  assignments: [
    {
      content_id: {
        type: Schema.Types.ObjectId,
        ref: 'content'
      },
      trello_id: {
        type: String,
        // required: true
      },
      content_title: {
        type: String,
        required: true
      },
      content_desc: {
        type: String,
        required: true
      },
      content_URL: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      }
    }
  ],
});

module.exports = User = mongoose.model('profile', ProfileSchema);