import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from './ContactsCollection';

Meteor.publish('allContacts', function getAllContacts() {
  return ContactsCollection.find({}); // Cursor (Live Query)
});
