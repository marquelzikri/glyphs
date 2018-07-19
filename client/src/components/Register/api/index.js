import api from '../../../common/api';

const call = {
  register : userData => {
    return api('api/users/register','POST', userData)
      .then(res => {
        return ({ msg: 'success', data:res.data });
      })
      .catch(err=> {
        return ({ msg: 'error', data:err.response.data });
      })
  }
}

export default call;