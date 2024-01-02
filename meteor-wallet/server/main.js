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

Meteor.startup(() => {
  if (!WalletsCollection.find().count()) {
    WalletsCollection.insert({
      createdAt: new Date(),
    });
  }
});
