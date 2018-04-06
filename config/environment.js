const env = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 4000;
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/crimes-${env}`;
const secret = process.env.SECRET || 'j<k>l^b&&r';

module.exports = { env, port, dbURI, secret };
