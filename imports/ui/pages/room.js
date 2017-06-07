import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';


import './room.html';
import '../components/list-topics.js';
import '../components/list-messages.js';

import { Rooms } from '../../api/rooms/rooms.js';

Template.Room.onCreated(function roomOnCreated() {
    Meteor.subscribe('topics');
});

Template.Room.onRendered(function () {
    Session.set('currentRoom',  this.data.currentRoom);
});

Template.Room.onDestroyed(function () {
    Session.set('currentRoom',  null);
});

Template.Room.helpers({
    room() {
        return Rooms.findOne({_id: this.currentRoom});
    },
    topicIsSelected(){
        return !!Session.get('currentTopic');
    }
});