import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { RoutePaths } from '/imports/ui/RoutePaths';

Accounts.emailTemplates.resetPassword.html = (user, url) =>
  `Hello,<br/><br/>To reset your password, simply click the link below.<br/><br/>${url}`;

Accounts.urls.resetPassword = (token) => Meteor.absoluteUrl(`${RoutePaths.RESET_PASSWORD.substring(1)}/${token}`);
