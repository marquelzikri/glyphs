const Profile = require("../../models/Profile");
const Content = require("../../models/Content");
const request = require('request');
const isEmpty = require('../../validation/is-empty');

// functions below are reusable in /routes/api/Content.js and /routes/api/Profile.js
const addBookmark = (content_id, user_id) => {
  // Content side
  Content.findById(content_id)
    .then(content => {
      if (
        content.bookmarks.filter(
          bookmark => bookmark.user.toString() === user_id
        ).length > 0
      ) {
        return ({ status: '400', msg: "User already bookmarked this Content" });
      }

      // Add user id to bookmarks array
      content.bookmarks.unshift({ user: user_id });

      // Save
      content.save();
    })
    .catch(err =>{
      return ({ status: '404', msg: "Content not found" })
    });

  // Profile side
  Profile.findOne({ user: user_id })
    .then(profile => {
      if (!profile) {
        return ({ status: '404', msg: 'Profile not found' });
      }

      if (
        profile.bookmarks.filter(
          bookmark => bookmark.content_id.toString() === content_id
        ).length > 0
      ) {
        return ({ status: '400', msg: "User already bookmarked this Content" });
      }


      Content.findById(content_id)
        .then(content => {
          profile.bookmarks.unshift({ 
            content_id: content_id, 
            content_title: content.title,
            content_desc: content.desc,
            content_URL: content.URL
          });
          profile.save();
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));

  return ({ status: '200', msg: 'Content has been bookmarked' });
}

const removeBookmark = (bookmark_id, user_id) => {
  // Content side
  Content.findById(bookmark_id)
    .then(content => {
      if (
        content.bookmarks.filter(
          bookmark => bookmark.user.toString() === user_id
        ).length === 0
      ) {
        return ({ status: '404', msg: "User haven't bookmark the Content yet" });
      }

      // Get remove index
      const removeIndex = content.bookmarks
        .map(item => item.user.toString())
        .indexOf(user_id);

      // Splice out from bookmarks array
      content.bookmarks.splice(removeIndex, 1);

      // Save
      content.save();
    })
    .catch(err =>{
      return ({ status: '404', msg: "Content not found" });
    });

  // Profile side
  Profile.findOne({ user: user_id })
    .then(profile => {
      if (profile.bookmarks.length < 1){
        return ({ status: '404', msg: 'No bookmarks yet.' });
      }

      if (
        profile.bookmarks.filter(
          bookmark => bookmark.content_id.toString() === bookmark_id
        ).length === 0
      ) {
        return ({ status: '404', msg: "User haven't bookmark the Content yet" });
      }

      // Get remove index
      const removeIndex = profile.bookmarks
        .map(item => item.content_id.toString())
        .indexOf(bookmark_id);

      // Splice comment out of array
      profile.bookmarks.splice(removeIndex, 1);

      // Save
      profile.save()
    });
  return ({ status: '200', msg: 'Bookmark has been removed' });
}

const addAssignment = (content_id, user_id) => {
  // Content side
  Content.findById(content_id)
    .then(content => {
      // Assigning user
      content.assignTo = user_id;
      // Save
      content.save();
    })
    .catch(err =>{
      return ({ status: '404', msg: "Content not found" });
    });
    

  // Profile side
  Profile.findOne({ user: user_id })
  .then(profile => {
    if (
      profile.assignments.filter(
        assignment => assignment.content_id.toString() === content_id
      ).length > 0
    ) {
      return ({ status: '400', msg: "User is working this Content" });
    }

    Content.findById(content_id)
      .then(content => {
        // profile.assignments.unshift({ 
        //   content_id: content_id, 
        //   content_title: content.title,
        //   content_desc: content.desc,
        //   content_URL: content.URL,
        //   status: 'on progress'
        // });

        // profile.save();

        // Trello API
        // API reference: 
        // https://developers.trello.com/reference/#cards-2
        // To get idList:
        // https://www.mangoblogger.com/blog/how-to-get-the-list-id-from-the-trello-api-board/
        var options = { method: 'POST',
        url: 'https://api.trello.com/1/cards',
        qs: 
        { name: content.title,
          desc: content.desc,
          pos: 'top',
          urlSource: content.URL,
          idList: '5b4ee0ffb027b1287590c041',
          keepFromSource: 'all',
          key: '06e0a501260d6c47dac5aeef01cc9bad',
          token: '6326f2caea518565c8ff6ed868730f6885751f6a7437c350b1c367bbccb225ab' } 
        };

        request(options, function async (error, response, body) {
          if (error) throw new Error(error);
          waitResponse = () => {
            // console.log(body["id"], 'waiting', body);
            let parsedBody = JSON.parse(body);
            if (!isEmpty(parsedBody.id)) {
              // console.log(typeof parsedBody.id, 'trello');
              newAssignment = { 
                content_id: content_id, 
                content_title: content.title,
                content_desc: content.desc,
                content_URL: content.URL,
                status: 'on progress', 
                trello_id: parsedBody.id.toString()
              }

              // console.log(newAssignment);
              profile.assignments.unshift(newAssignment);

              profile.save().then(res => console.log(res));
            }else{
              setTimeout(waitResponse, 250);
            }
          }
          waitResponse();
        });
      })
      .catch(err => console.log(err));
  }).catch(err => console.log(err));

  return ({ status: '200', msg: 'This Content has been assigned.' });
}

// ToDo: add change assignment status
const removeAssignment = (content_id, user_id) => {
  // Content side
  Content.findById(content_id)
    .then(content => {
      if (content.assignTo.toString() === user_id.toString()){
        content.assignTo = undefined;
        // Save
        content.save();
      }
    })
    .catch(err =>{
      return ({ status: '404', msg: "Content not found" });
    });
  
  // Profile side
  Profile.findOne({ user: user_id })
  .then(profile => {
    if (
      profile.assignments.filter(
        assignment => assignment.content_id.toString() === content_id
      ).length < 1
    ) {
      return ({ status: '404', msg: "Assignment not found" });
    }

    // Get remove index
    const removeIndex = profile.assignments
      .map(item => item.content_id.toString())
      .indexOf(content_id);

    // Trello API
    // API reference:
    // https://developers.trello.com/reference/#delete-card
    var options = { method: 'DELETE',
    url: 'https://api.trello.com/1/cards/'+profile.assignments[removeIndex].trello_id,
    qs: 
      { key: '06e0a501260d6c47dac5aeef01cc9bad',
        token: '6326f2caea518565c8ff6ed868730f6885751f6a7437c350b1c367bbccb225ab' } 
      };
    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      // console.log(body);
    });

    // Splice comment out of array
    profile.assignments.splice(removeIndex, 1);

    // Save
    profile.save()
  });

  return ({ status: '200', msg: 'This Content has been unassigned.' });
}

module.exports = {
  removeBookmark,
  addBookmark,
  addAssignment,
  removeAssignment
}