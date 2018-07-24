const Parser = require('rss-parser');
// Import models
const Content = require("../../models/Content");
const Feed = require('../../models/Feed');

// Download feeds to Content from RSS per 15 minutes
const downloadFeeds = feedId => {
  Feed.findById(feedId)
      .then(feed => {
        if (feed) {
          let parser = new Parser();
          (async () => {
            let feedContents = await parser.parseURL(feed.URL);

            feedContents.items.forEach(item => {
              const newContent = new Content({
                assignee: feed.addedBy,
                URL: item.link,
                title: item.title,
                desc: item.content,
                category: 'RSS', // By default
                RSSId: feedId,
                date: item.isoDate
              });

              Content.findOne({ 'URL': newContent.URL }, 'URL')
                .then(content => {
                  if (content) {
                    console.log(content);
                  }else{
                    newContent.save().then(res => console.log(res.URL));
                  }
                })
                .catch(err => {
                  console.log(err)
                });
            });
          })();
        }
      })
      .catch(err => err
        // res.status(404).json({ msg: "Feed URL not found" })
      );
}

const fetchRSS = () => {
  Feed.find()
    .sort({ date: -1 })
    .then(feeds => {
      // console.log(feeds);
      if (feeds) {
        feeds.forEach(feed => {
          downloadFeeds(feed.id)
        })
      }
    })
    .catch(err => err
      // res.status(404).json({ msg: "No feed available yet." })
    );
}

module.exports = {
  downloadFeeds,
  fetchRSS
}