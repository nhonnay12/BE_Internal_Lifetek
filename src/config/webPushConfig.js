const webpush = require('web-push');
const dotenv = require('dotenv');
dotenv.config();

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
  'mailto:support@yourapp.com',
  publicVapidKey,
  privateVapidKey
);

module.exports = { webpush, publicVapidKey };
