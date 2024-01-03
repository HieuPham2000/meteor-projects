import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from '../collections/ContactsCollection';

Meteor.publish('myContacts', function publishContacts() {
  const { userId } = this;
  if (!userId) {
    throw new Meteor.Error('Access denied.');
  }
  return ContactsCollection.find({ userId, archived: { $ne: true } }); // Cursor (Live Query)
});
