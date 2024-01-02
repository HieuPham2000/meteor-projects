import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { EMAIL_REGEX, ID_REGEX } from '/imports/common/common';

export const ContactsCollection = new Mongo.Collection('contacts');

const ContactsSchema = new SimpleSchema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      regEx: EMAIL_REGEX,
    },
    imageUrl: {
      type: String,
      label: 'Image URL',
      optional: true,
      custom() {
        if (!this.isSet) return; // return undefined <=> valid
        try {
          new URL(this.value);
        } catch (err) {
          return 'badUrl'; // return an error type string <=> invalid
        }
      },
    },
    walletId: {
      type: String,
      // regEx: ID_REGEX,
    },
    createdAt: {
      type: Date,
    },
  },
  {
    getErrorMessage(error, label) {
      if (error.type === 'regEx') {
        switch (label) {
          case 'Email':
            return `${label} is not a valid email address`;
          case 'Wallet ID':
            return `${label} is not a valid ID`;
        }
      }

      if (error.type === 'badUrl') return `${label} is not a valid URL`;
    },
  },
);

// Có thể cài "aldeed:simple-schema"
// Rồi import: import SimpleSchema from 'meteor/aldeed:simple-schema';
// Khi đó có thể dùng SimpleSchema.RegEx.Email, SimpleSchema.RegEx.Id 
// (simpl-schema đã remove built-in regular expression vì DDoS security risks)

// Ngoài ra có thể custom error message như sau:
// ContactsSchema.messageBox.messages({
//   'regEx email': '[label] is not a valid email address',
//   'badUrl imageUrl': '[label] is not a valid URL',
// });

// @ts-ignore
ContactsCollection.attachSchema(ContactsSchema);
