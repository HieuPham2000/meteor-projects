import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from '../collections/ContactsCollection';

Meteor.publish('allContacts', function getAllContacts() {
  return ContactsCollection.find(); // Cursor (Live Query)
});

Meteor.publish('contacts', function getContacts() {
  return ContactsCollection.find({ archived: { $ne: true } });
});
