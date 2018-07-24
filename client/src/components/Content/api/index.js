import api from '../../../common/api';

const call = {
  assignContent: (contentID) => {
    return api('/api/contents/assign/me/'+contentID, 'POST')
      .then(res => {
        return ({
          msg: 'success',
          data: res.data
        })
      })
      .catch(err => {
        return ({
          msg: 'error',
          data: err.response
        })
      })
  },
  removeAssignment: (contentID) => {
    return api('/api/contents/un_assign/me/'+contentID, 'POST')
      .then(res => {
        return ({
          msg: 'success',
          data: res.data
        })
      })
      .catch(err => {
        return ({
          msg: 'error',
          data: err.response
        })
      })
  },
  bookmarkContent: (contentID) => {
    return api('/api/contents/bookmark/'+contentID, 'POST')
      .then(res => {
        return ({
          msg: 'success',
          data: res.data
        })
      })
      .catch(err => {
        return ({
          msg: 'error',
          data: err.response
        })
      })
  },
  removeBookmark: (contentID) => {
    return api('/api/contents/bookmark/remove/'+contentID, 'POST')
      .then(res => {
        return ({
          msg: 'success',
          data: res.data
        })
      })
      .catch(err => {
        return ({
          msg: 'error',
          data: err.response
        })
      })
  },
}

export default call;
