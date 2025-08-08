const dotenv = require('dotenv');
dotenv.config();

const env = process.env.NODE_ENV || 'development';

const configs = {
  development: {
    dbUri: process.env.DEV_DB_URI || 'mongodb://localhost:27017/southern_love_dev',
    jwtSecret: process.env.DEV_JWT_SECRET || 'devSecret'
  },
  test: {
    dbUri: process.env.TEST_DB_URI || 'mongodb://localhost:27017/southern_love_test',
    jwtSecret: process.env.TEST_JWT_SECRET || 'testSecret'
  },
  production: {
    dbUri: process.env.DB_URI,
    jwtSecret: process.env.JWT_SECRET
  }
};

module.exports = configs[env];
