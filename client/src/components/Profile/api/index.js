import api from '../../../common/api';

const call = {
  getBookmarks: () => {
    return api('/api/Profile/bookmarks/')
      .then(res => {
        return ({msg: 'success', data:res.data})
      })
      .catch(err => {
        return ({msg: 'error', data:err.response.data})
      });
  },
  removeBookmark: content_id => {
    return api(('/api/Profile/remove/bookmark/'+content_id.toString()), 'POST')
      .then(res => {
        return ({msg: 'success', data:res.data})
      })
      .catch(err => {
        return ({msg: 'error', data:err.response.data})
      });
  },
  getAssignments: () => {
    return api('/api/Profile/assignments/')
      .then(res => {
        return ({msg: 'success', data: res.data})
      })
      .catch(err => {
        return ({msg: 'error', data:err.response.data})
      });
  },
  removeAssignment: content_id => {
    return api(('/api/Profile/remove/assignment/'+content_id.toString()), 'POST')
      .then(res => {
        return ({ msg: 'success', data: res.data });
      })
      .catch(err => {
        return ({ msg: 'error', data: err.response.data});
      })
  }
  // ToDo: add change assignment status
}

export default call;
