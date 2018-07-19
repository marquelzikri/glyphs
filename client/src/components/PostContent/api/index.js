import api from '../../../common/api';

const call = {
  addContent: contentData => {
    return api('/api/contents', 'POST', contentData)
      .then(res => {
        return ({ msg: 'success', data: res.data })
      })
      .catch(err => {
        return ({ msg: 'error', data: err.response.data })
      })
  },

  addFeed: feedData => {
    return api('/api/feeds', 'POST', feedData)
      .then(res => {
        return ({ msg: 'success', data: res.data })
      })
      .catch(err => {
        return ({ msg: 'error', data: err.response.data })
      })
  },

  checkURL: URL => {
    return api('/api/feeds/isRSS', 'POST', URL)
      .then(res => {
        return ({ msg: 'success', data: res.data })
      })
      .catch(err => {
        return ({ msg: 'error', data: err.response.data })
      })
  }
}

export default call;
