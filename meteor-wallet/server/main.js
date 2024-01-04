import { Meteor } from 'meteor/meteor';
import '/imports/api/collections/ContactsCollection';
import '/imports/api/collections/WalletsCollection';
import '/imports/api/collections/TransactionsCollection';
import '/imports/api/methods/ContactsMethod';
import '/imports/api/methods/TransactionsMethod';
import '/imports/api/methods/RolesMethod';
import '/imports/api/publications/ContactsPublication';
import '/imports/api/publications/WalletsPublication';
import '/imports/infra/CustomError';
import '/imports/infra/accounts';
import '/imports/infra/roles';

Meteor.startup(() => {
  if (!process.env.MAIL_URL) {
    console.log('process.env.MAIL_URL is required');

    // Tạm fix MAIL_URL
    process.env.MAIL_URL = 'smtp://ardith.gutmann@ethereal.email:n92gpZYpGFCas9mA8A@smtp.ethereal.email:587';
  }

  // Khai báo ở đây
  // process.env.MAIL_URL="smtp://user:pass@yourservice:587";

  // Hoặc chạy cmd: MY_ENV=xxx meteor --port 3000
  // Hoặc chạy file command.sh
});
