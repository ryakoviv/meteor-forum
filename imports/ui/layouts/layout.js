import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './layout.html';

Template.Layout.onCreated(function() {
    Meteor.subscribe('users');
});