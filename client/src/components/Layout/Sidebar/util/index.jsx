const getRSS_Start = state => ({
  loadingGetRSS: true,
  errorGetRSS: false,
  successGetRSS: false,
  getRSSErrors: {},
  getRSSData: {}
});

const getRSS_Success = state => ({
  loadingGetRSS: false,
  errorGetRSS: false,
  successGetRSS: true,
  getRSSErrors: {},
  getRSSData: {}
});

const getRSS_Error = state => ({
  loadingGetRSS: false,
  errorGetRSS: true,
  successGetRSS: false,
  getRSSErrors: {},
  getRSSData: {}
});

const setRSSLink = state => ({
  rss_link: '',
  rss_name: ''
})

export {
  getRSS_Start,
  getRSS_Success,
  getRSS_Error,
  setRSSLink
}