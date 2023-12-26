import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from './ContactsCollection';

Meteor.methods({
  'contacts.insert'({ name, email, imageUrl }) {
    ContactsCollection.insert({ name, email, imageUrl });
  },
});
