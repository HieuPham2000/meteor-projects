import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const WalletsCollection = new Mongo.Collection('wallets');

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

const WalletsSchema = new SimpleSchema({
  balance: {
    type: Number,
    min: 0,
    defaultValue: 0,
  },
  currency: {
    type: String,
    allowedValues: ['USD', 'VND'],
    defaultValue: 'VND',
  },
  createdAt: {
    type: Date
  },
  userId: {
    type: String
  }
});

// @ts-ignore
WalletsCollection.attachSchema(WalletsSchema);
