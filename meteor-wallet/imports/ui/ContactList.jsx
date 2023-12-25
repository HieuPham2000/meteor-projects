import React from 'react';
import { ContactsCollection } from '/imports/api/ContactsCollection';
import { useTracker } from 'meteor/react-meteor-data';

export default function ContactList() {
  const contacts = useTracker(() => {
    return ContactsCollection.find({}).fetch();
  });

  return (
    <>
      <h3>Contact List</h3>
      <ul>
        {contacts.map((contact) => (
          <li>
            {contact.name} - {contact.email} - {contact.imageUrl}
          </li>
        ))}
      </ul>
    </>
  );
}
