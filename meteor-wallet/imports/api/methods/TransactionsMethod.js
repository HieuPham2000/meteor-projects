import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

import SimpleSchema from 'simpl-schema';

import { WalletRoles } from '/imports/infra/WalletRoles';
import { ADD_TYPE, TRANSFER_TYPE, TransactionsCollection } from '../collections/TransactionsCollection';

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
  'transactions.remove'(transactionId) {
    const { userId } = this;
    if (!userId) {
      throw new Meteor.Error('Access denied.', 'Access denied.');
    }

    check(transactionId, String);

    if (!Roles.userIsInRole(userId, WalletRoles.ADMIN)) {
      throw new Meteor.Error('Permission denied.', 'Permission denied.');
    }

    TransactionsCollection.remove(transactionId);
  },
});
