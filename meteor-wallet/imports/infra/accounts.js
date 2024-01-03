import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { RoutePaths } from '/imports/ui/RoutePaths';
import { WalletsCollection } from '/imports/api/collections/WalletsCollection';

Accounts.emailTemplates.resetPassword.html = (user, url) =>
  `Hello,<br/><br/>To reset your password, simply click the link below.<br/><br/>${url}`;

Accounts.urls.resetPassword = (token) => Meteor.absoluteUrl(`${RoutePaths.RESET_PASSWORD.substring(1)}/${token}`);

Accounts.onCreateUser((options, user) => {
  // Note: không có this.userId ở đây, kể cả dùng function

  const customizedUser = { ...user };

  // console.log('options: ', options);
  // console.log('user: ', user);

  WalletsCollection.insert({
    userId: user._id,
    createdAt: new Date(),
  });

  customizedUser.email = customizedUser.emails[0].address; // tạm fix code vì hiện tại chỉ đang đăng nhập bằng email

  return customizedUser;
});

Accounts.setDefaultPublishFields({
  ...Accounts._defaultPublishFields.projection,
  email: 1,
});
