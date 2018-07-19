const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  URL: {
    type: String,
    required: true
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

module.exports = Feed = mongoose.model('feed', FeedSchema);