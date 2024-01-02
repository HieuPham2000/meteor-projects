import { Meteor } from 'meteor/meteor';
import '/imports/api/collections/ContactsCollection';
import '/imports/api/collections/WalletsCollection';
import '/imports/api/collections/TransactionsCollection';
import '/imports/api/methods/ContactsMethod';
import '/imports/api/methods/TransactionsMethod';
import '/imports/api/publications/ContactsPublication';
import '/imports/api/publications/WalletsPublication';
import { WalletsCollection } from '/imports/api/collections/WalletsCollection';
import SimpleSchema from 'simpl-schema';
import '/imports/infra/CustomError';

// const currencySchema = new SimpleSchema({
//   balance: {
//     type: Number,
//     defaultValue: 0,
//   },
//   currency: {
//     type: String,
//     allowedValues: ['USD', 'EUR', 'VND'],
//     defaultValue: 'VND'
//   },
// });

// const walletSchema = new SimpleSchema({
//   currencies: Array,
//   'currencies.$': currencySchema,
//   createdAt: Date
// });

const walletSchema = new SimpleSchema({
  balance: {
    type: Number,
    defaultValue: 0,
  },
  currency: {
    type: String,
    allowedValues: ['USD', 'VND'],
    defaultValue: 'VND',
  },
  createdAt: Date,
});

Meteor.startup(() => {
  if (!WalletsCollection.find().count()) {
    const walletData = {
      createdAt: new Date(),
    };
    const cleanedData = walletSchema.clean(walletData);
    walletSchema.validate(cleanedData);
    WalletsCollection.insert(cleanedData);
  }
});
