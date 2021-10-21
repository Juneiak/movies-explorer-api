const allowedLinks = [
  '',
];

const corsHandler = (req, res, next) => {
  const { headers, method } = req;
  if (allowedLinks.includes(headers.origin)) {
    res.header('Access-Control-Allow-Origin', headers.origin);
  }
  if (method === 'OPTIONS') {
    const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
    const requestHeaders = headers['access-control-request-headers'];
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }
  next();
  return 'end';
};

module.exports = corsHandler;
