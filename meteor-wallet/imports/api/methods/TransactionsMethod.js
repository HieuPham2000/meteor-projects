import { Meteor } from 'meteor/meteor';
import { ADD_TYPE, TRANSFER_TYPE, TransactionsCollection } from '../collections/TransactionsCollection';
import SimpleSchema from 'simpl-schema';

Meteor.methods({
  'transactions.insert'(args) {
    const { userId } = this;
    if (!userId) {
      throw new Meteor.Error('Access denied.');
    }

    const schema = new SimpleSchema({
      isTransferring: Boolean,
      sourceWalletId: String,
      destinationContactId: {
        type: String,
        optional: !args.isTransferring,
      },
      amount: {
        type: Number,
        min: 0,
        exclusiveMin: true,
      },
    });

    schema.validate(args);

    const { isTransferring, sourceWalletId, destinationContactId, amount } = args;

    TransactionsCollection.insert({
      type: isTransferring ? TRANSFER_TYPE : ADD_TYPE,
      sourceWalletId,
      destinationContactId: isTransferring ? destinationContactId : null,
      amount,
      createdAt: new Date(),
      userId,
    });
  },
});
