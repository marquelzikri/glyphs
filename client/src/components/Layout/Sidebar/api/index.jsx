import api from '../../../../common/api';

const call = {
  getRSS: () => {
    return api('/api/feeds')
      .then(res => {
        return ({ msg: 'success', data: res.data })
      })
      .catch(err => {
        return ({ msg: 'error', data: err.response.data })
      })
  }
}

export default call;
