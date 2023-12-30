import { Meteor } from 'meteor/meteor';
import '/imports/api/ContactsCollection';
import '/imports/api/WalletsCollection';
import '/imports/api/TransactionsCollection';
import '/imports/api/ContactsMethod';
import '/imports/api/TransactionsMethod';
import '/imports/api/ContactsPublication';
import '/imports/api/WalletsPublication';
import { WalletsCollection } from '/imports/api/WalletsCollection';

Meteor.startup(() => {
  if(!WalletsCollection.find().count()) {
    WalletsCollection.insert({
      balance: 0,
      currency: 'USD',
      createdAt: new Date()
    })
  }
});
