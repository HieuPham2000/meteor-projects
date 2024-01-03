import { Meteor } from 'meteor/meteor';
import '/imports/api/collections/ContactsCollection';
import '/imports/api/collections/WalletsCollection';
import '/imports/api/collections/TransactionsCollection';
import '/imports/api/methods/ContactsMethod';
import '/imports/api/methods/TransactionsMethod';
import '/imports/api/publications/ContactsPublication';
import '/imports/api/publications/WalletsPublication';
import { WalletsCollection } from '/imports/api/collections/WalletsCollection';
import '/imports/infra/CustomError';
import '/imports/infra/accounts';

Meteor.startup(() => {
  if (!WalletsCollection.find().count()) {
    WalletsCollection.insert({
      createdAt: new Date(),
    });
  }
  if(!process.env.MAIL_URL) {
    console.log('process.env.MAIL_URL is required');
  }
  
  // Khai báo ở đây
  // process.env.MAIL_URL="smtp://user:pass@yourservice:587";

  // Hoặc chạy cmd: MY_ENV=xxx meteor --port 3000
  // Hoặc chạy file command.sh
});
