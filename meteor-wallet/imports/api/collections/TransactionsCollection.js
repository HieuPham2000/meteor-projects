import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { WalletsCollection } from './WalletsCollection';

export const TRANSFER_TYPE = 'TRANSFER';
export const ADD_TYPE = 'ADD';

class TransactionsMongoCollection extends Mongo.Collection {
  insert(doc, callback) {
    if (doc.type === TRANSFER_TYPE) {
      const sourceWallet = WalletsCollection.findOne(doc.sourceWalletId);

      // TODO: tạm thời chưa check destinationWallet, vì hiện tại chưa xử lý (đang fix tạo 1 wallet duy nhất khi run app)
      // const destinationWallet = WalletsCollection.findOne(doc.destinationWalletId);

      if (!sourceWallet) {
        throw new Meteor.Error('Source wallet not found.');
      }

      // if (!destinationWallet) {
      //   throw new Meteor.Error('Destination wallet not found.');
      // }

      if (sourceWallet.balance < doc.amount) {
        throw new Meteor.Error('Insufficient funds.');
      }

      WalletsCollection.update(doc.sourceWalletId, {
        $inc: { balance: -doc.amount },
      });

      WalletsCollection.update(doc.destinationWalletId, {
        $inc: { balance: doc.amount },
      });
    }

    if (doc.type === ADD_TYPE) {
      const sourceWallet = WalletsCollection.findOne(doc.sourceWalletId);

      if (!sourceWallet) {
        throw new Meteor.Error('Source wallet not found.');
      }

      WalletsCollection.update(doc.sourceWalletId, {
        $inc: { balance: doc.amount },
      });
    }

    return super.insert(doc, callback);
  }
}

export const TransactionsCollection = new TransactionsMongoCollection('transactions');

const TransactionsSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: [TRANSFER_TYPE, ADD_TYPE],
  },
  sourceWalletId: {
    type: String,
    // regex Id
  },
  destinationWalletId: {
    type: String,
    optional: true,
    // regex Id
  },
  amount: {
    type: Number,
    min: 0,
    exclusiveMin: true,
  },
  createdAt: {
    type: Date,
  },
});

// @ts-ignore
TransactionsCollection.attachSchema(TransactionsSchema);
