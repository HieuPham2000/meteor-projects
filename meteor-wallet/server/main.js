import { Meteor } from 'meteor/meteor';
import '/imports/api/ContactsCollection';
import '/imports/api/WalletsCollection';
import '/imports/api/TransactionsCollection';
import '/imports/api/ContactsMethod';
import '/imports/api/TransactionsMethod';
import '/imports/api/ContactsPublication';
import '/imports/api/WalletsPublication';
import { WalletsCollection } from '/imports/api/WalletsCollection';
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
