import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TransactionsCollection } from './TransactionsCollection';
import SimpleSchema from 'simpl-schema';

Meteor.methods({
  'transactions.insert'(args) {
    const schema = new SimpleSchema({
      isTransferring: Boolean,
      sourceWalletId: String,
      destinationWalletId: {
        type: String,
        optional: !args.isTransferring,
      },
      amount: {
        type: Number,
        min: 0,
        exclusiveMin: true
      },
    });

    schema.validate(args);

    const { isTransferring, sourceWalletId, destinationWalletId, amount } = args;

    TransactionsCollection.insert({
      type: isTransferring ? 'TRANSFER' : 'ADD',
      sourceWalletId,
      destinationWalletId: isTransferring ? destinationWalletId : null,
      amount,
      createdAt: new Date(),
    });
  },
});
