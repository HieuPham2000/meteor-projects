import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { WalletRoles } from '/imports/infra/WalletRoles';

Meteor.methods({
  'roles.isAdmin'() {
    const { userId } = this;
    if (!userId) {
      throw new Meteor.Error('Access denied');
    }

    return Roles.userIsInRole(userId, WalletRoles.ADMIN);
  }
})
