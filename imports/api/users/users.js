import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
    Meteor.publish('users', function() {
        return Meteor.users.find();
    });
}