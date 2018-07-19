import api from '../../../common/api';

const call = {
  getContents: (category, feed_id) => {
    if (category === ''){
      return api('/api/contents/')
    } else {
      if (feed_id === '') {
        return api('/api/contents/category/'+category)
          .then(res => {
            return ({ msg: 'success', data: res.data })
          })
          .catch(err => {
            return ({ msg: 'error', data: err.response.data })
          });
      }else{
        return api('/api/contents/category/'+category+'/'+feed_id)
          .then(res => {
            return ({ msg: 'success', data: res.data })
          })
          .catch(err => {
            return ({ msg: 'error', data: err.response.data })
          });
      }
    }
  },
  parseRSS: feed_id => {
    return api('/api/feeds/parse_rss/'+feed_id)
      .then(res => {
        return ({ msg: 'success', data: res.data })
      })
      .catch(err => {
        return ({ msg: 'error', data: err.response.data })
      })
  }
}

export default call;
