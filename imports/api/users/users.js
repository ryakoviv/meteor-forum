import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isServer) {
    getRandomColor = function () {
        let letters = '0123456789ABCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    Accounts.onCreateUser(function (options, user) {
        user.color = getRandomColor();
        return user;
    });

    Meteor.publish('users', function() {
        return Meteor.users.find();
    });
}